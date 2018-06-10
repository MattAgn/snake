import { Component } from 'react';
import Snake from './SnakeBrain';

// Constants{ snake ? 
const PAUSE = 32;
const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

export default class Game extends Component {

  constructor() {
    super();
    this.nbColumns = 34;
    this.nbRows = 16;
    this.wallsDifficulty = {easy: 0, medium: 7, hell: 15};
    //TODO: highscore per difficulty
    const savedHighScore = parseInt(localStorage.getItem('highScore'), 10);
    let highScore = savedHighScore ? savedHighScore : 0;
    const elementSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    this.state = {
      canvasHeight: elementSize * this.nbRows,
      canvasWidth: elementSize * this.nbColumns,
      elementSize: elementSize,
      highScore: highScore,
      interval: null,
      nbWalls: this.wallsDifficulty["medium"],
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

  handleClickRetry = () => {
    this.setState({isGameOver: false}, this.generateNewGame);
  }

  handlePauseGame = () => {
    if (this.state.isGamePaused) {
      this.startGame();
    } else {
      this.pauseGame();
    }
  }

  handleClickDifficulty = value => () => {
    this.setState({ 
      nbWalls: this.wallsDifficulty[value]
    }, this.init);
  }


  //TODO: to rectify
  getRandomXPosition = x => 
    Math.floor(Math.random() * this.nbColumns) * this.state.elementSize;
  getRandomYPosition = y => 
    Math.floor(Math.random() * this.nbRows) * this.state.elementSize;


  updateSizeCanvas = () => {
    this.setState(prevState => {
      const newElementSize = Math.round(Math.sqrt(
        Math.pow(window.innerHeight, 2) + 
        Math.pow(window.innerWidth, 2)) / 50);
      const { snake, target, walls } = prevState;
      let resizedTarget, resizedWalls;
      if (target) {
        resizedTarget = {
          radius: newElementSize / 2,
          x: target.x / prevState.elementSize * newElementSize,
          y: target.y / prevState.elementSize * newElementSize,
        }
      }
      if (walls) {
        resizedWalls = walls.map(wall => ({
          id: wall.id,
          x: wall.x / prevState.elementSize * newElementSize,
          y: wall.y / prevState.elementSize * newElementSize,
          squareSize: newElementSize,
        }))
      }
      if (snake) {
        snake.updatePositionOnResize(
          prevState.elementSize, 
          newElementSize,
          newElementSize * this.nbRows,
          newElementSize * this.nbColumns);
      }
      return(
        {
          canvasHeight: newElementSize * this.nbRows,
          canvasWidth: newElementSize * this.nbColumns,
          elementSize : newElementSize,
          target: resizedTarget,
          walls: resizedWalls,
          snake,
        }
      )
    })
  }


  init = () => {
    const walls = this.generateNewWalls();
    const snake = this.generateNewSnake(walls);
    const target = this.generateNewTarget(walls);
    this.setState({ walls, snake, target }); 
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
    const { snake, target, walls, highScore } = this.state;
    const { hasReachedTarget, hasLost } = snake.run(target, walls);
    let newTarget, newHighScore;
    if (hasReachedTarget) { 
      newTarget = this.generateNewTarget(this.state.walls);
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

  generateNewWalls = () => {
    const walls = [];
    for (let i = 0; i < this.state.nbWalls; i++) {
      const wall = {
        x: this.getRandomXPosition(),
        y: this.getRandomYPosition(),
        squareSize: this.state.elementSize,
        id: i,
      }
      walls.push(wall)
    }
    return walls
  }

  generateAvailableCoordinates = walls => {
    let coordinates = {
      y: this.getRandomYPosition(), 
      x: this.getRandomXPosition(),
    };
    walls.forEach(wall => {
      if (wall.x === coordinates.x && wall.y === coordinates.y) {
        coordinates = this.generateAvailableCoordinates(walls);
      } 
    })
    return coordinates;  
  }

  generateNewTarget = walls => {
    const coordinates = this.generateAvailableCoordinates(walls);
    return ({
      y: coordinates.y + this.state.elementSize / 2, 
      x: coordinates.x + this.state.elementSize / 2, 
      radius: this.state.elementSize / 2,
    })
  }

  generateNewSnake = walls => {
    const coordinates = this.generateAvailableCoordinates(walls);
    const snake = new Snake(
      coordinates.x,
      coordinates.y, 
      this.state.elementSize,
      this.state.canvasHeight,
      this.state.canvasWidth,
    );
    return snake;
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
      target, 
      snake, 
      walls, 
      highScore, 
      canvasHeight, 
      canvasWidth, 
      isMenuOpened, 
      isGameOver,
      isGamePaused, 
    } = this.state;
    const score = snake ? snake.body.length - 1 : 0;
    return children({
      target,
      snake,
      walls,
      highScore,
      canvasHeight,
      canvasWidth,
      score,
      isMenuOpened,
      isGameOver,
      isGamePaused,
      handlePauseGame: this.handlePauseGame,
      handleClickRetry: this.handleClickRetry,
      handleClickDifficulty: this.handleClickDifficulty,
      handleClickSettings: this.handleClickSettings,
    });
  }
}
