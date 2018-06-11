import { Component } from 'react';
import Snake from './gameElements/SnakeBrain';
import Target from './gameElements/Target';
import Walls from './gameElements/Walls';


// Constants
const PAUSE = 32;
const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
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
      },
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
    window.addEventListener('keydown', this.move);
  }

  handleClickSettings = () => {
    if (this.state.isMenuOpened) {
      this.setState({
        isMenuOpened: false,
        isGamePaused: !this.state.isGamePaused,
        isGameOver: false,
      }, this.startGame)
    } else {
      this.setState({
        isMenuOpened: true,
        isGamePaused: true,
        isGameOver: false,
      })
    }
  }

  handleRetry = () => {
    document.removeEventListener('keypress', this.onKeyPressRetry)
    this.setState({isGameOver: false}, this.generateNewGame);
  }

  onKeyPressRetry = (e) => {
    if (e.keyCode || e.which) {
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
    this.setState({settings}, this.init)
  }


  updateSizeCanvas = () => {
    const newSquareSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    const { snake, target, walls } = this.state.gameElements;
    walls.updatePosition(newSquareSize);
    target.updatePosition(newSquareSize);
    snake.updatePosition(newSquareSize);
    this.setState({gameElements: { walls, snake, target }});
  }


  init = () => {
    const { squareSize, settings } = this.state;
    const walls = new Walls({squareSize, settings});
    const snake = new Snake({squareSize, walls});
    const target = new Target({squareSize, walls, snake});
    this.setState({gameElements: { walls, snake, target }}); 
  }

  startGame = () => {
    const interval = setInterval(this.runGame, 120);
    this.setState({interval, isGamePaused: false});
  }

  generateNewGame = () => {
    this.init();
    this.startGame();
  }
  
  getCurrentHighScore = () => {
    const { nbPlayers, mode, difficulty } = this.state.settings;
    return (this.state.highScores[nbPlayers][mode][difficulty]);
  }

  setNewHighScores = (newHighScore) => {
    const { highScores } = this.state;
    const  { nbPlayers, mode, difficulty } = this.state.settings;
    highScores[nbPlayers][mode][difficulty] = newHighScore;
    return highScores;
  }

  runGame = () => {
    const { snake, target, walls } = this.state.gameElements;
    let { highScores, squareSize } = this.state;
    const { hasReachedTarget, hasLost } = snake.run(target);
    let newTarget, newHighScore;
    if (hasReachedTarget) { 
      newTarget = new Target({ squareSize, snake, walls });
      if (snake.body.length > this.getCurrentHighScore()) {
        newHighScore = snake.body.length - 1;
        highScores = this.setNewHighScores(newHighScore);
        localStorage.setItem('highScores', JSON.stringify(highScores));
      } 
    } else {
      newTarget = target;
    }
    if (hasLost) {
      this.pauseGame();
      document.addEventListener('keypress', this.onKeyPressRetry)
      this.setState(() => ({isGameOver: true}));  
    }
    else {
      this.setState(() => ({gameElements: {walls, snake, target: newTarget}, highScores}));
    }
  }

  pauseGame = () => {
    let interval = this.state.interval;
    clearInterval(interval); 
    interval = null;
    this.setState(() => ({interval, isGamePaused: true}));
  }

  move = (event) => {
    let { snake } = this.state.gameElements;
    switch(event.keyCode || event.which) {
      case ARROW_DOWN:  snake.moveDown(); break;
      case ARROW_UP:    snake.moveUp(); break;
      case ARROW_LEFT:  snake.moveLeft(); break;
      case ARROW_RIGHT: snake.moveRight(); break;
      case PAUSE:       this.handlePauseGame(); break;  
      default: break;
    }
    this.setState(() => ({ snake }));
  }

  render() {
    const { children } = this.props;
    const {
      settings, 
      gameElements, 
      isMenuOpened, 
      isGameOver,
      isGamePaused, 
    } = this.state;
    const highScore = this.getCurrentHighScore();
    const score = gameElements ? gameElements.snake.body.length - 1 : 0;
    const scores = {highScore, score};
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
    });
  }
}
