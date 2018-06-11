import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { primaryColor } from '../../utilities/styling';

class SnakeBody extends Component {
  componentDidUpdate(prevProps) {
    if (prevProps.snake !== this.props.snake) {
      return true;
    }
    return false;
  }

  render() {
    const { snake } = this.props;
    return (
      <React.Fragment>
        {snake.body.map(bodyPart => (
          <Rect
            key={bodyPart.id}
            x={bodyPart.x}
            y={bodyPart.y}
            height={snake.squareSize}
            width={snake.squareSize}
            fill={primaryColor}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default SnakeBody;
