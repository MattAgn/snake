import React, { Component } from 'react';

import GameContext from './GameContext';
import Snake from './game-logic/SnakeModel';
import Target from './game-logic/TargetModel';
import Walls from './game-logic/WallsModel';
import GameElement from './game-logic/GameElementModel';
import {
  keyCodes,
  defaultHighScores,
  scoresNeeded
} from './utilities/helpers/constants';

// TODO: issue: possibility to press space bar when menu opened to delete
// TODO: issue: sometimes, buttons in header are not clickable

class GameProvider extends Component {
  constructor() {
    super();
    const savedHighScores = null; //TODO:localStorage.getItem('highScores');
    let highScores = savedHighScores
      ? JSON.parse(savedHighScores)
      : defaultHighScores;
    const squareSize = Math.round(
      Math.sqrt(
        Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
      ) / 50
    );
    this.state = {
      settings: {
        nbPlayers: 1,
        mode: 'classic',
        difficulty: 1
      },
      squareSize,
      highScores,
      score: 0,
      unlockedLevels: null,
      hasUnlockedLevel: false,
      interval: null,
      currentHighScore: null,
      isGamePaused: true,
      isMenuOpened: true,
      isGameOver: false
    };
  }

  componentDidMount = () => {
    this.init();
    window.addEventListener('resize', this.updateSizeCanvas);
  };

  /******************/
  /* EVENT HANDLETS */
  /******************/

  handleClickSettings = () => {
    if (this.state.isMenuOpened) {
      this.setState(
        {
          isMenuOpened: false,
          isGamePaused: !this.state.isGamePaused,
          isGameOver: false
        },
        this.startGame
      );
    } else {
      this.pauseGame();
      this.setState({
        isMenuOpened: true,
        isGameOver: false
      });
    }
  };

  handleClickNextLevel = () => {
    const nextLevel = this.getLastLevelUnlocked();
    const { settings } = this.state;
    settings.difficulty = nextLevel;
    this.setState({ settings, isGameOver: false }, this.generateNewGame);
  };

  handleRetry = () => {
    // windocodew.removeEventListener('keypress', this.onKeyPressRetry);
    this.setState({ isGameOver: false }, this.generateNewGame);
  };

  // onKeyPressRetry = e => {
  //   if (e.keyCode === keyCodes.ENTER || e.which === keyCodes.ENTER) {
  //     this.handleRetry();
  //   }
  // };

  handlePauseGame = () => {
    if (this.state.isGamePaused) {
      this.startGame();
    } else {
      this.pauseGame();
    }
  };

  handleClickNbPlayers = value => () => {
    const { settings } = this.state;
    settings.nbPlayers = parseInt(value);
    settings.mode = 'classic';
    settings.difficulty = 1;
    this.setState({ settings }, this.init);
  };

  //TODO: to factorise with above ?
  handleClickMode = value => () => {
    const { settings } = this.state;
    settings.mode = value;
    if (value === 'level') {
      settings.difficulty = this.getLastLevelUnlocked();
    } else {
      settings.difficulty = 1;
    }
    this.setState({ settings }, this.init);
  };

  handleClickDifficulty = value => () => {
    const { settings } = this.state;
    settings.difficulty = parseInt(value);
    this.setState({ settings }, this.init);
  };

  updateSizeCanvas = () => {
    const newSquareSize = Math.round(
      Math.sqrt(
        Math.pow(window.innerHeight, 2) + Math.pow(window.innerWidth, 2)
      ) / 50
    );
    const { snakes, targets, walls } = this.state.gameElements;
    walls.updatePosition(newSquareSize);
    for (let target of targets) {
      target.updatePosition(newSquareSize);
    }
    for (let snake of snakes) {
      snake.updatePosition(newSquareSize, walls);
    }
    this.setState({
      gameElements: { walls, snakes, targets },
      squareSize: newSquareSize
    });
  };

  /******************/
  /*** GAME LOGIC ***/
  /******************/

  init = () => {
    const { squareSize, settings } = this.state;
    GameElement.unavailableSquares = [];
    const walls = new Walls(squareSize, settings);
    const snakes = [];
    const targets = [];
    for (let i = 0; i < settings.nbPlayers; i++) {
      snakes.push(new Snake(squareSize));
      targets.push(new Target(squareSize));
    }
    this.setState({
      gameElements: { walls, snakes, targets },
      currentHighScore: this.getCurrentHighScore(),
      unlockedLevels: this.getUnlockedLevels(),
      hasUnlockedLevel: false,
      score: 0
    });
  };

  startGame = () => {
    const interval = setInterval(this.runGame, 140);
    this.setState({
      interval,
      isGamePaused: false,
      hasUnlockedLevel: false
    });
    window.addEventListener('keydown', this.move);
  };

  generateNewGame = () => {
    this.init();
    this.startGame();
  };

  getCurrentHighScore = () => {
    console.log(this.state.settings);
    const { nbPlayers, mode, difficulty } = this.state.settings;
    return this.state.highScores[nbPlayers][mode][difficulty];
  };

  setNewHighScores = newHighScore => {
    const { highScores } = this.state;
    const { nbPlayers, mode, difficulty } = this.state.settings;
    highScores[nbPlayers][mode][difficulty] = newHighScore;
    this.setState({ highScores, currentHighScore: newHighScore });
    return highScores;
  };

  checkNewHighScore = () => {
    let { highScores, currentHighScore, score, settings } = this.state;
    if (score > currentHighScore) {
      if (
        settings.mode === 'level' &&
        score >= scoresNeeded[settings.difficulty + 1] &&
        currentHighScore < scoresNeeded[settings.difficulty + 1]
        // check if level has been unlocked
      ) {
        this.setState({ hasUnlockedLevel: true });
      }
      highScores = this.setNewHighScores(score);
      localStorage.setItem('highScores', JSON.stringify(highScores));
    }
  };

  getUnlockedLevels = () => {
    const { highScores, settings } = this.state;
    const unlockedLevels = {
      2: null,
      3: null,
      4: null,
      5: null,
      6: null
    };
    for (let i = 2; i < 7; i++) {
      const previousLevel = i - 1;
      unlockedLevels[i] =
        highScores[settings.nbPlayers]['level'][previousLevel] >=
        scoresNeeded[i];
    }
    return unlockedLevels;
  };

  getLastLevelUnlocked = () => {
    let result = 1;
    const { unlockedLevels } = this.state;
    for (let i = 2; i < Object.keys(unlockedLevels).length + 1; i++) {
      if (unlockedLevels[i]) {
        result = i;
      }
    }
    return result;
  };

  snakesNeedNewTargets = targetsEaten => {
    let { squareSize, settings, gameElements } = this.state;
    const { targets } = this.state.gameElements;
    let currentTargets = targets;
    for (let targetEaten of targetsEaten) {
      currentTargets = currentTargets.filter(
        target => target.x !== targetEaten.x || target.y !== targetEaten.y
      );
    }
    while (currentTargets.length < settings.nbPlayers) {
      currentTargets.push(new Target(squareSize));
    }
    return currentTargets;
  };

  runGame = () => {
    let { snakes, targets, walls } = this.state.gameElements;
    let havePlayersLost = false;
    let targetsEaten = [];
    for (let i = 0; i < snakes.length; i++) {
      let runResults;
      if (snakes.length > 1) {
        if (i === 0) {
          runResults = snakes[i].run(targets, walls, snakes[1]);
        } else {
          runResults = snakes[i].run(targets, walls, snakes[0]);
        }
      } else {
        runResults = snakes[i].run(targets, walls);
      }
      let { hasLost, targetEaten } = runResults;
      havePlayersLost = havePlayersLost || hasLost;
      if (targetEaten) {
        targetsEaten.push(targetEaten);
      }
    }
    if (targetsEaten.length > 0) {
      this.setState(
        { score: this.state.score + targetsEaten.length },
        this.checkNewHighScore
      );
      targets = this.snakesNeedNewTargets(targetsEaten);
    }
    if (havePlayersLost) {
      this.pauseGame();
      window.removeEventListener('keydown', this.move);
      window.addEventListener('keypress', this.onKeyPressRetry);
      const unlockedLevels = this.getUnlockedLevels();
      this.setState(() => ({
        isGameOver: true,
        unlockedLevels
      }));
    } else {
      this.setState(() => ({ gameElements: { walls, snakes, targets } }));
    }
  };

  pauseGame = () => {
    let interval = this.state.interval;
    clearInterval(interval);
    interval = null;
    this.setState(() => ({ interval, isGamePaused: true }));
  };

  move = event => {
    let { snakes } = this.state.gameElements;
    switch (event.keyCode || event.which) {
      case keyCodes.RIGHT_PLAYER_DOWN:
        snakes[0].moveDown();
        break;
      case keyCodes.RIGHT_PLAYER_UP:
        snakes[0].moveUp();
        break;
      case keyCodes.RIGHT_PLAYER_LEFT:
        snakes[0].moveLeft();
        break;
      case keyCodes.RIGHT_PLAYER_RIGHT:
        snakes[0].moveRight();
        break;
      case keyCodes.PAUSE:
        this.handlePauseGame();
        break;
      default:
        break;
    }
    if (snakes.length > 1) {
      switch (event.keyCode || event.which) {
        case keyCodes.LEFT_PLAYER_DOWN:
          snakes[1].moveDown();
          break;
        case keyCodes.LEFT_PLAYER_UP:
          snakes[1].moveUp();
          break;
        case keyCodes.LEFT_PLAYER_LEFT:
          snakes[1].moveLeft();
          break;
        case keyCodes.LEFT_PLAYER_RIGHT:
          snakes[1].moveRight();
          break;
        default:
          break;
      }
    }
    this.setState(() => ({ snakes }));
  };

  render() {
    return (
      <GameContext.Provider
        value={{
          ...this.state,
          handlePauseGame: this.handlePauseGame,
          handleClickRetry: this.handleRetry,
          handleClickDifficulty: this.handleClickDifficulty,
          handleClickSettings: this.handleClickSettings,
          handleClickMode: this.handleClickMode,
          handleClickNbPlayers: this.handleClickNbPlayers,
          handleClickNextLevel: this.handleClickNextLevel
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    );
  }
}

export default GameProvider;
