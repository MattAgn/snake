import React, { Component } from 'react';

export default class Game extends Component {

  constructor() {
    super();
    this.nbColumns = 34;
    this.nbRows = 16;
    this.nbWalls = 8;
    const savedHighScore = parseInt(localStorage.getItem('highScore'), 10);
    let highScore = savedHighScore ? savedHighScore : 0;
    const elementSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    this.state = {
      boardHeight: elementSize * this.nbRows,
      boardWidth: elementSize * this.nbColumns,
      elementSize: elementSize,
      highScore: highScore,
      interval: null,
      isGamePaused: false,
    } 
  }

  componentDidMount() {
    this.updateSizeCanvas();
    this.init();
    window.addEventListener('resize', this.updateSizeCanvas);
    window.addEventListener('keydown', this.move);
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
      const { snake, target } = prevState;
      let resizedTarget;
      if (target) {
        resizedTarget = {
          radius: newElementSize / 2,
          x: target.x / prevState.elementSize * newElementSize,
          y: target.y / prevState.elementSize * newElementSize,
        }
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
          boardHeight: newElementSize * this.nbRows,
          boardWidth: newElementSize * this.nbColumns,
          elementSize : newElementSize,
          target: resizedTarget,
          snake,
        }
      )
    })
  }


  init = () => {
    const walls = this.generateNewWalls();
    const snake = this.generateNewSnake(walls);
    const target = this.generateNewTarget(walls);
    this.setState({ walls, snake, target }, this.startGame); 
  }

  startGame = () => {
    const interval = setInterval(this.runGame, 120);
    this.setState({interval, isGamePaused: false});
  }

  runGame = () => {
    const { snake, target, walls, highScore } = this.state;
    const hasReachedTarget = snake.run(target, walls);
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
    this.setState(() => ({snake, target: newTarget, highScore: newHighScore}));
  }

  pauseGame = () => {
    let interval = this.state.interval;
    clearInterval(interval); 
    interval = null;
    this.setState({interval, isGamePaused: true});
  }

  generateNewWalls = () => {
    const walls = [];
    for (let i = 0; i < this.nbWalls; i++) {
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
      this.state.boardHeight,
      this.state.boardWidth,
    );
    return snake;
  }

  move = (event) => {
    let { snake, isGamePaused } = this.state;
    switch(event.keyCode || event.which) {
      case ARROW_DOWN:  snake.moveDown(); break;
      case ARROW_UP:    snake.moveUp(); break;
      case ARROW_LEFT:  snake.moveLeft(); break;
      case ARROW_RIGHT: snake.moveRight(); break;
      case PAUSE:       
        if (isGamePaused) {
          this.startGame();
        } else {
          this.pauseGame();
        }
        break;  
      default: break;
    }
    this.setState(() => ({ snake }));
  }

  render() {
    const { children } = this.props;
    const { target, snake, walls, highScore } = this.state;
    return children({
      target,
      snake,
      walls,
      hightScore
    });
  }
}
