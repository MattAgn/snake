import { Component } from 'react';
import { HardwareKeyboardArrowUp } from 'material-ui';
import Snake from './gameElements/SnakeBrain';
import Walls from './gameElements/Target';
import Target from './gameElements/Walls';


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
    const savedHighScore = localStorage.getItem('highScore');
    let highScore = savedHighScore ? savedHighScore : 0;
    const squareSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    this.state = {
      settings: {
        nbPlayers: 1,
        mode: 'classic',
        difficulty: 1,
      },
      squareSize: squareSize,
      highScore: highScore,
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
    const { settings, score } = this.state;
    settings.difficulty = value;
    this.setState({settings}, this.init);
  }


  updateSizeCanvas = () => {
    const newSquareSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    const { snake, target, walls } = this.state;
    walls.updatePosition(newSquareSize);
    target.updatePosition(newSquareSize);
    snake.updatePosition(newSquareSize);
    this.setState({ walls, snake, target });
  }


  init = () => {
    const { squareSize, settings } = this.state;
    const walls = new Walls({squareSize, settings});
    const snake = new Snake({squareSize});
    const target = new Target({squareSize, walls, snake});
    this.setState({objects: { walls, snake, target }}); 
  }

  startGame = () => {
    const interval = setInterval(this.runGame, 120);
    this.setState({interval, isGamePaused: false});
  }

  generateNewGame = () => {
    this.init();
    this.startGame();
  }
  

  runGame = () => {
    const { snake, target, walls } = this.state.objects;
    const { highScore, squareSize } = this.state;
    const { hasReachedTarget, hasLost } = snake.run(target, walls);
    let newTarget, newHighScore;
    if (hasReachedTarget) { 
      newTarget = new Target({ squareSize, snake, walls });
      if (snake.body.length > highScore) {
        newHighScore = snake.body.length - 1;
        localStorage.setItem('highScore', newHighScore);
      } else {
        newHighScore = highScore;
      } 
    } else {
      newTarget = target;
      newHighScore = highScore;
    }
    if (hasLost) {
      this.pauseGame();
      document.addEventListener('keypress', this.onKeyPressRetry)
      this.setState(() => ({isGameOver: true}));  
    }
    else {
      this.setState(() => ({snake, target: newTarget, highScore: newHighScore}));
    }
  }

  pauseGame = () => {
    let interval = this.state.interval;
    clearInterval(interval); 
    interval = null;
    this.setState(() => ({interval, isGamePaused: true}));
  }

  move = (event) => {
    let { snake } = this.state;
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
      target, 
      snake, 
      walls, 
      highScore, 
      isMenuOpened, 
      isGameOver,
      isGamePaused, 
    } = this.state;
    const score = snake ? snake.body.length - 1 : 0;
    return children({
      settings,
      target,
      snake,
      walls,
      highScore,
      score,
      difficulty,
      isMenuOpened,
      isGameOver,
      isGamePaused,
      handlePauseGame: this.handlePauseGame,
      handleClickRetry: this.handleRetry,
      handleClickDifficulty: this.handleClickDifficulty,
      handleClickSettings: this.handleClickSettings,
    });
  }
}
