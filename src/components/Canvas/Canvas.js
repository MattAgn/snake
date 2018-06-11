import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';

import SnakeBody from './SnakeBody';
import Target from './Target';
import Walls from './Walls';

import GameElement from '../../gameElements/GameElement';
import SnakeElement from '../../gameElements/SnakeBrain';
import WallsElement from '../../gameElements/Walls';
import TargetElement from '../../gameElements/Target';


const Canvas = ({ snake, walls, target }) => {
  let canvasHeight;
  let canvasWidth;
  if (snake) {
    canvasHeight = GameElement.NB_ROWS * snake.squareSize;
    canvasWidth = GameElement.NB_COLUMNS * snake.squareSize;
  }
  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer>
        <Target target={target} />
        <SnakeBody snake={snake} />
        <Walls walls={walls} />
      </Layer>
    </Stage>
  );
};

Canvas.propTypes = {
  snake: PropTypes.instanceOf(SnakeElement).isRequired,
  walls: PropTypes.instanceOf(WallsElement).isRequired,
  target: PropTypes.instanceOf(TargetElement).isRequired,
};

export default Canvas;
