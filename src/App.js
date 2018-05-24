import React, { Component } from 'react';
import { Stage, Layer, Text } from 'react-konva';
import SnakeComp from './components/SnakeComp';
import Target from './components/Target';
import Snake from './game-objects/Snake';

// Constants
const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

class App extends Component {

  state = {
    totalHeight: window.innerHeight,
    totalWidth: window.innerWidth,
    interval: null,
    elementSize: Math.round(Math.sqrt(
                  Math.pow(window.innerHeight, 2) + 
                  Math.pow(window.innerWidth,2)) / 100),
  }

  componentDidMount() {
    this.updateSizeCanvas();
    this.init();
    window.addEventListener('resize', this.updateSizeCanvas);
    window.addEventListener('keydown', this.move);
  }

  getXPosition = x => Math.round(x * this.state.totalHeight);
  getYPosition = y => Math.round(y * this.state.totalWidth);
  getRandomXPosition = x => this.getXPosition(Math.random());
  getRandomYPosition = x => this.getXPosition(Math.random());


  updateSizeCanvas = () => {
    this.setState({
      totalHeight: window.innerHeight,
      totalWidth: window.innerWidth,
      elementSize: Math.round(Math.sqrt(
                Math.pow(window.innerHeight, 2) + 
                Math.pow(window.innerWidth,2)) / 100),
    });
  }

  init = () => {
    const snake = new Snake(
      this.getRandomXPosition(), 
      this.getRandomYPosition(), 
      this.state.elementSize 
    );
    this.setState(prevState => ({
      target: {
        x: this.getRandomXPosition(), 
        y: this.getRandomYPosition(), 
        radius: this.state.elementSize,
      },
      snake: snake,
    }), this.startGame)
  }

  startGame = () => {
    const interval = setInterval(this.runGame, 100);
    this.setState({interval});
  }

  runGame = () => {
    const snake = this.state.snake;
    const cellReached = {
      x: snake.body[0].x + snake.dx,
      y: snake.body[0].y + snake.dy,
      id: snake.lastId ++,
    };
    if (snake.hasReachedTarget(this.state.target)) {
      this.generateNewTarget();
    } else {
      snake.body.pop(); // if target not reached, the snake continues
    };
    snake.body = [cellReached].concat(snake.body);
    this.setState(() => ({snake}));
  }

  generateNewTarget = () => {
    this.setState(prevState => ({
      target: {
        x: this.getRandomXPosition(), 
        y: this.getRandomYPosition(), 
        radius: this.state.elementSize,
      },
    }))
  }

  move = (event) => {
    const snake = this.state.snake;
    switch(event.keyCode || event.which) {
      case ARROW_DOWN:  snake.moveDown(); break;
      case ARROW_UP:    snake.moveUp(); break;
      case ARROW_LEFT:  snake.moveLeft(); break;
      case ARROW_RIGHT: snake.moveRight(); break;
      default: break;
    }
    this.setState(() => { snake });
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
