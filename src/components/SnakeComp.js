import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Rect, Text } from 'react-konva';

class SnakeComp extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.snake !== this.props.snake) {
      return true;
    }
    return false;
  }

  render() {
    const { snake } = this.props;
    return (
      <Rect
        x={snake.x}
        y={snake.y}
        height={snake.squareSize * 2}
        width={snake.squareSize * 2}
        fill="#8BC34A"
      />
    );
  }
}

export default SnakeComp;
