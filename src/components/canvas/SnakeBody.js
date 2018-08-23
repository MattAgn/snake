import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';
import { primaryColor } from '../../utilities/styling';
import SnakeBrain from '../../gameElements/SnakeBrain';

class SnakeBody extends Component {
  static propTypes = {
    snake: PropTypes.instanceOf(SnakeBrain).isRequired,
    color: PropTypes.string.isRequired,
  }
  
  componentDidUpdate(prevProps) {
    if (prevProps.snake !== this.props.snake) {
      return true;
    }
    return false;
  }

  render() {
    const { snake, color } = this.props;
    return (
      <React.Fragment>
        {snake.body.map(bodyPart => (
          <Rect
            key={bodyPart.id}
            x={bodyPart.x}
            y={bodyPart.y}
            height={snake.squareSize}
            width={snake.squareSize}
            fill={color}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default SnakeBody;
