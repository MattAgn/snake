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


const Canvas = ({
  snakes, walls, targets,
}) => {
  let canvasHeight;
  let canvasWidth;
  if (snakes) {
    canvasHeight = GameElement.NB_ROWS * snakes[0].squareSize;
    canvasWidth = GameElement.NB_COLUMNS * snakes[0].squareSize;
  }
  return (
    <Stage width={canvasWidth} height={canvasHeight}>
      <Layer>
        {targets.map(target => (
          <Target target={target} />
        ))}
        {snakes.map(snake => (
          <SnakeBody snake={snake} />
        ))}
        <Walls walls={walls} />
      </Layer>
    </Stage>
  );
};

Canvas.propTypes = {
  snakes: PropTypes.arrayOf(PropTypes.instanceOf(SnakeElement).isRequired).isRequired,
  walls: PropTypes.instanceOf(WallsElement).isRequired,
  targets: PropTypes.arrayOf(PropTypes.instanceOf(TargetElement).isRequired).isRequired,
};

export default Canvas;
