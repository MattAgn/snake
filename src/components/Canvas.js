import React, { Component } from 'react';
import Target from "../game-objects/Target";
import Snake from "../game-objects/Snake";

// Constants
const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

class Canvas extends Component {
  state = {
    height: window.innerHeight,
    width: window.innerWidth,
    hasGameStarted: false,
  }

  componentDidMount() {
    this.canvas = this.refs.canvas;
    this.c = this.canvas.getContext('2d');
    this.init();
    window.addEventListener('resize', this.init);
    // window.addEventListener('keydown', this.move);
  }

  updateSizeCanvas = () => {
    this.setState({
      totalHeight: window.innerHeight,
      totalWidth: window.innerWidth,
      totalDiag: Math.sqrt(Math.pow(window.innerHeight, 2) + 
                Math.pow(window.innerWidth,2)),
    });
    // this.c.clearRect(0, 0, totalWidth, totalHeight);
  }

  init = () => {
    this.setState({
      totalHeight: window.innerHeight,
      totalWidth: window.innerWidth,
      totalDiag: Math.sqrt(Math.pow(window.innerHeight, 2) + 
                Math.pow(window.innerWidth,2)),
      hasGameStarted: true,
    }, () => {
      this.target = new Target(
        this.c, 
        Math.floor(Math.random()*this.state.totalHeight), 
        Math.floor(Math.random()*this.state.totalWidth), 
        Math.floor(this.state.totalDiag / 150));
      this.snake = new Snake(
        this.c, 
        Math.floor(Math.random()*this.state.totalHeight), 
        Math.floor(Math.random()*this.state.totalWidth), 
        Math.floor(this.state.totalDiag / 100));
      console.log(this.snake);
      console.log(this.target);
      this.animate();
    });
  }

  move = (event) => {
    switch(event.keyCode) {
      case ARROW_DOWN: 
        this.setState(prevState => ({
          position: {
            x: prevState.position.x,
            y: prevState.position.y + 5,
          }
        }), this.update);
        break;
      case ARROW_UP: 
        this.setState(prevState => ({
          position: {
            y: prevState.position.y - 5,
            x: prevState.position.x,
          }
        }),this.update);
        break;
      case ARROW_LEFT: 
        this.setState(prevState => ({
          position: {
            x: prevState.position.x - 5,
            y: prevState.position.y,
          }
        }),this.update);
        break;
      case ARROW_RIGHT: 
        this.setState(prevState => ({
          position: {
            y: prevState.position.y,
            x: prevState.position.x + 5,
          }
        }),this.update);
        break;
      default: 
        this.update();
        break;
    }
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.c.clearRect(0, 0, this.state.totalWidth, this.state.totalHeight);
    this.target.draw();
    this.snake.draw();
  }

  render() {
    const style = {
      width: this.state.totalWidth,
      height: this.state.totalHeight,
    }
    return (
      <canvas ref='canvas' style={style}/>
    )
  }
}


export default Canvas;