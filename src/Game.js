import { Component } from 'react';
import Snake from './gameElements/SnakeBrain';
import Target from './gameElements/Target';
import Walls from './gameElements/Walls';
import GameElement from './gameElements/GameElement';


// Constants
const PAUSE = 32;
const RIGHT_PLAYER_UP = 38;
const RIGHT_PLAYER_LEFT = 37;
const RIGHT_PLAYER_RIGHT = 39;
const RIGHT_PLAYER_DOWN = 40;
const LEFT_PLAYER_UP = 90;
const LEFT_PLAYER_RIGHT = 68;
const LEFT_PLAYER_DOWN = 83;
const LEFT_PLAYER_LEFT = 81;
//TODO: possibility to press space bar when menu opened to delete

export default class Game extends Component {

  constructor() {
    super();
    const savedHighScores = localStorage.getItem('highScores');
    const defaultHighScores = {
      1: {
        classic: { 0: 0, 1: 0, 2: 0 },
        levels: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
      },
      2: {
        classic: { 0: 0, 1: 0, 2: 0 },
        levels: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 }
      },  
    }
    //TODO: check highScore structure
    let highScores = savedHighScores ? JSON.parse(savedHighScores) : defaultHighScores;
    const squareSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    this.state = {
      settings: {
        nbPlayers: 1,
        mode: 'classic',
        difficulty: 1,
      }, //TODO: not very proper between levels and difficulty
      squareSize,
      highScores,
      interval: null,
      isGamePaused: true,
      isMenuOpened: true,
      isGameOver: false,
    } 
  }

  componentDidMount() {
    this.init();
    window.addEventListener('resize', this.updateSizeCanvas);
  }

  // EVENTS HANDLERS
  handleClickSettings = () => {
    if (this.state.isMenuOpened) {
      this.setState({
        isMenuOpened: false,
        isGamePaused: !this.state.isGamePaused,
        isGameOver: false,
      }, this.startGame)
    } else {
      this.pauseGame();
      this.setState({
        isMenuOpened: true,
        isGameOver: false,
      })
    }
  }

  handleRetry = () => {
    window.removeEventListener('keypress', this.onKeyPressRetry)
    this.setState({isGameOver: false}, this.generateNewGame);
  }

  onKeyPressRetry = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      this.handleRetry();
    }
  }

  handlePauseGame = () => {
    if (this.state.isGamePaused) {
      this.startGame();
    } else {
      this.pauseGame();
    }
  }

  handleClickDifficulty = value => () => {
    const { settings } = this.state;
    settings.difficulty = value;
    this.setState({settings}, this.init);
  }

  //TODO: to factorise with above ?
  handleClickMode = value => () => {
    const {settings} = this.state;
    settings.mode = value;
    settings.difficulty = 1;
    this.setState({settings}, this.init)
  }

  handleClickNbPlayers = value => () => {
    const { settings } = this.state;
    settings.nbPlayers = value;
    settings.mode = 'classic';
    settings.difficulty = 1;
    this.setState({settings}, this.init);
  }


  updateSizeCanvas = () => {
    const newSquareSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    const { snakes, targets, walls } = this.state.gameElements;
    walls.updatePosition(newSquareSize);
    for (let target of targets) {target.updatePosition(newSquareSize);}
    for (let snake of snakes) {snake.updatePosition(newSquareSize, walls);}
    this.setState({gameElements: { walls, snakes, targets }, squareSize: newSquareSize});
  }



  // GAME LOGIC

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
    this.setState({gameElements: {walls, snakes, targets}}); 
  }

  startGame = () => {
    const interval = setInterval(this.runGame, 140);
    this.setState({interval, isGamePaused: false});
    window.addEventListener('keydown', this.move);
  }

  generateNewGame = () => {
    this.init();
    this.startGame();
  }
  
  getCurrentHighScore = () => {
    const { nbPlayers, mode, difficulty } = this.state.settings;
    return (this.state.highScores[nbPlayers][mode][difficulty]);
  }

  getCurrentScore = () => (
    this.state.gameElements.snakes.reduce((score, snake) => (
      score + snake.body.length - 1), 0)
  )

  setNewHighScores = (newHighScore) => {
    const { highScores } = this.state;
    const  { nbPlayers, mode, difficulty } = this.state.settings;
    highScores[nbPlayers][mode][difficulty] = newHighScore;
    this.setState({highScores});
    return highScores;
  }

  checkNewHighScore = () => {
    let { highScores, gameElements } = this.state;
    const { snakes } = gameElements;
    const currentScore = this.getCurrentScore();
    if (currentScore > this.getCurrentHighScore()) {
      highScores = this.setNewHighScores(currentScore);
      localStorage.setItem('highScores', JSON.stringify(highScores));
    }
  } 

  snakesNeedNewTargets = targetsEaten => {
    let { squareSize, settings, gameElements } = this.state;
    const { targets } = this.state.gameElements;
    let currentTargets = targets;
    for (let targetEaten of targetsEaten) {
      currentTargets = currentTargets.filter(target => (
        target.x !== targetEaten.x || target.y !== targetEaten.y
      ))
    }
    while (currentTargets.length < settings.nbPlayers) {
      currentTargets.push(new Target(squareSize));
    }
    return currentTargets;
  }

  runGame = () => {
    let { snakes, targets, walls } = this.state.gameElements;
    let havePlayersLost = false;
    let targetsEaten = [];
    for (let i = 0; i < snakes.length; i++) {
      let runResults;
      if (snakes.length > 1) {
        if (i === 0) {
          runResults = snakes[i].run(targets, walls, snakes[1])
        } else {
          runResults = snakes[i].run(targets, walls, snakes[0])
        }
      } else {
        runResults = snakes[i].run(targets, walls)
      }
      let { hasLost, targetEaten } = runResults;
      havePlayersLost = havePlayersLost || hasLost;
      if (targetEaten) {targetsEaten.push(targetEaten);}
    }
    if (targetsEaten.length > 0) {
      this.checkNewHighScore();
      targets = this.snakesNeedNewTargets(targetsEaten);
    }
    if (havePlayersLost) {
      window.removeEventListener('keydown', this.move);
      window.addEventListener('keypress', this.onKeyPressRetry);
      this.pauseGame();
      this.setState(() => ({isGameOver: true}));  
    }
    else {
      this.setState(() => ({ gameElements: {walls, snakes, targets}}));
    }
  }

  pauseGame = () => {
    let interval = this.state.interval;
    clearInterval(interval); 
    interval = null;
    this.setState(() => ({interval, isGamePaused: true}));
  }

  move = (event) => {
    let { snakes } = this.state.gameElements;
    switch(event.keyCode || event.which) {
      case RIGHT_PLAYER_DOWN:  snakes[0].moveDown(); break;
      case RIGHT_PLAYER_UP:    snakes[0].moveUp(); break;
      case RIGHT_PLAYER_LEFT:  snakes[0].moveLeft(); break;
      case RIGHT_PLAYER_RIGHT: snakes[0].moveRight(); break;
      case PAUSE:       this.handlePauseGame(); break;  
      default: break;
    }
    if (snakes.length > 1) {
      switch(event.keyCode || event.which) {
        case LEFT_PLAYER_DOWN:  snakes[1].moveDown(); break;
        case LEFT_PLAYER_UP:    snakes[1].moveUp(); break;
        case LEFT_PLAYER_LEFT:  snakes[1].moveLeft(); break;
        case LEFT_PLAYER_RIGHT: snakes[1].moveRight(); break;
        default: break;
      }
    }
    this.setState(() => ({ snakes }));
  }

  render() {
    const { children } = this.props;
    const {
      settings,
      highScores, 
      gameElements, 
      isMenuOpened, 
      isGameOver,
      isGamePaused, 
    } = this.state;
    const highScore = this.getCurrentHighScore() ;
    const score = gameElements ? this.getCurrentScore() : 0;
    const scores = {highScores, score};
    return children({
      settings,
      gameElements,
      scores,
      isMenuOpened,
      isGameOver,
      isGamePaused,
      handlePauseGame: this.handlePauseGame,
      handleClickRetry: this.handleRetry,
      handleClickDifficulty: this.handleClickDifficulty,
      handleClickSettings: this.handleClickSettings,
      handleClickMode: this.handleClickMode,
      handleClickNbPlayers: this.handleClickNbPlayers,
    });
  }
}
