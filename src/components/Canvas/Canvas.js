import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import SnakeBody from './SnakeBody';
import Target from './Target';
import Walls from './Walls';
import Snake from '../../game/Snake';

const Canvas = ({
  canvasWidth, canvasHeight, target, snake, walls,
}) => (
  <Stage width={canvasWidth} height={canvasHeight}>
    <Layer>
      <Target {...target} />
      {snake && <SnakeBody snake={snake} />}
      {walls && <Walls walls={walls} />}
    </Layer>
  </Stage>
);

// TODO: change object
Canvas.propTypes = {
  canvasHeight: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  snake: PropTypes.instanceOf(Snake).isRequired,
  walls: PropTypes.object.isRequired,
  target: PropTypes.object.isRequired,
};

export default Canvas;
