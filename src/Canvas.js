import React, { Component } from 'react'

//TODO: careful, overflowing
const styles = {
  canvas: {
    width: '100vw',
    height: '100vh',
    // backgroundColor: 'silver',
  },
};

const ARROW_UP = 38;
const ARROW_LEFT = 37;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;

class Canvas extends Component {

  state = {
    position: {
      x: 0,
      y: 0,
    }
  }

  componentDidMount() {
    this.c = this.refs.canvas.getContext('2d');
    // this.animate();
    this.c.fillStyle = 'green';
    this.c.fillRect(this.state.position.x, this.state.position.y, 5, 5);
    window.addEventListener('keydown', this.move);
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
  }

  update = () => {
    this.c.clearRect(0, 0, window.innerWidth, window.innerHeight)
    this.c.fillStyle = 'green';
    this.c.fillRect(this.state.position.x, this.state.position.y, 5, 5);
  }

  render() {
    return (
      <canvas ref='canvas' style={styles.canvas}/>
    )
  }
}


export default Canvas;