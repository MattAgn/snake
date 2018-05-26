import React, { Component } from 'react';
import { Stage, Layer } from 'react-konva';
import SnakeComp from './components/SnakeComp';
import Target from './components/Target';
import Snake from './game-objects/Snake';

// Constants
const PAUSE = 32;
const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

class App extends Component {

  constructor() {
    super();
    this.nbColumns = 34;
    this.nbRows = 16;
    const elementSize = Math.round(Math.sqrt(
      Math.pow(window.innerHeight, 2) + 
      Math.pow(window.innerWidth, 2)) / 50);
    this.state = {
      boardHeight: elementSize * this.nbRows,
      boardWidth: elementSize * this.nbColumns,
      elementSize: elementSize,
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

  updatePosition = () => {
    //TODO:
  }

  init = () => {
    const snake = new Snake(
      this.getRandomXPosition(), 
      this.getRandomYPosition(), 
      this.state.elementSize,
      this.state.boardHeight,
      this.state.boardWidth,
    );
    this.setState(prevState => ({
      target: {
        x: this.getRandomXPosition() + prevState.elementSize / 2, 
        y: this.getRandomYPosition() + prevState.elementSize / 2, 
        radius: this.state.elementSize / 2,
      },
      snake: snake,
    }), this.startGame)
  }

  startGame = () => {
    const interval = setInterval(this.runGame, 100);
    this.setState({interval, isGamePaused: false});
  }

  runGame = () => {
    const { snake, target } = this.state;
    const hasReachedTarget = snake.run(target);
    if (hasReachedTarget) { this.generateNewTarget(); }
    this.setState(() => ({snake}));
  }

  pauseGame = () => {
    let interval = this.state.interval;
    clearInterval(interval); 
    interval = null;
    this.setState({interval, isGamePaused: true});
  }

  generateNewTarget = () => {
    this.setState(prevState => ({
      target: {
        y: this.getRandomYPosition() + prevState.elementSize / 2, 
        x: this.getRandomXPosition() + prevState.elementSize / 2, 
        radius: this.state.elementSize / 2,
      },
    }))
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
    const { target, snake } = this.state;
    return (
      <React.Fragment>
        { snake ? 
          <React.Fragment>
            <Stage width={this.state.boardWidth} height={this.state.boardHeight}>
              <Layer>
                <Target {...target}/>
                <SnakeComp snake={snake}/>
              </Layer>
            </Stage>
            <h2> {`Score : ${(snake.body.length -1).toString()}`} </h2>
          </React.Fragment>
          : <h2>Loading</h2>}
      </React.Fragment>
    );
  }
}

export default App;
