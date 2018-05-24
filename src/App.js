import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';
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

  state = {
    totalHeight: window.innerHeight,
    totalWidth: window.innerWidth,
    interval: null,
    isGamePaused: false,
    elementSize: Math.round(Math.sqrt(
                  Math.pow(window.innerHeight, 2) + 
                  Math.pow(window.innerWidth, 2)) / 50),
  }

  componentDidMount() {
    this.updateSizeCanvas();
    this.init();
    window.addEventListener('resize', this.updateSizeCanvas);
    window.addEventListener('keydown', this.move);
  }

  //TODO: to rectify
  getXPosition = x => Math.floor(x * Math.floor(this.state.totalWidth -           this.state.totalWidth % this.state.elementSize))
  getYPosition = y => Math.floor(y * Math.floor(this.state.totalHeight -
    this.state.totalHeight % this.state.elementSize)) 
  getRandomXPosition = x => this.getXPosition(Math.random());
  getRandomYPosition = y => this.getYPosition(Math.random());


  updateSizeCanvas = () => {
    this.setState(() => ({
      totalHeight: window.innerHeight,
      totalWidth: window.innerWidth,
      elementSize: Math.round(Math.sqrt(
                Math.pow(window.innerHeight, 2) + 
                Math.pow(window.innerWidth, 2)) / 50),
    }));
  }

  init = () => {
    const snake = new Snake(
      this.getRandomXPosition(), 
      this.getRandomYPosition(), 
      this.state.elementSize
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
    this.setState(() => ({interval}));
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
    this.setState(() => {interval});
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
    let { snake, interval, isGamePaused } = this.state;
    switch(event.keyCode || event.which) {
      case ARROW_DOWN:  snake.moveDown(); break;
      case ARROW_UP:    snake.moveUp(); break;
      case ARROW_LEFT:  snake.moveLeft(); break;
      case ARROW_RIGHT: snake.moveRight(); break;
      case PAUSE:       
        if (isGamePaused) {
          this.startGame();
          isGamePaused = false;
        } else {
          this.pauseGame();
          isGamePaused = true;
        }
        break;  
      default: break;
    }
    console.log(isGamePaused)
    this.setState(() => ({ snake, isGamePaused }));
  }

  render() {
    const { target, snake } = this.state;
    return (
      <Stage width={this.state.totalWidth} height={this.state.totalHeight}>
        <Layer>
          { snake ? 
          <React.Fragment>
            <SnakeComp snake={snake}/>
            <Target {...target}/>
            <Text text={(snake.body.length -1).toString()}/>
          </React.Fragment>
          : <Text text="loading"/>}
        </Layer>
      </Stage>
    );
  }
}

export default App;
