import React, { Component } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';
import SnakeComp from './components/SnakeComp';

class App extends Component {

  state = {
    totalHeight: window.innerHeight,
    totalWidth: window.innerWidth,
    hasGameStarted: false,
  }

  render() {
    return (
      <Stage width={this.state.totalWidth} height={this.state.totalHeight}>
        <Layer>
          <SnakeComp 
            x={0}
            y={0}
            height={10}
            width={10}/>
        </Layer>
      </Stage>
    );
  }
}

export default App;
