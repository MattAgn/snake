import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer } from 'react-konva';
import styled from 'styled-components';

import SnakeBody from './SnakeBody';
import Target from './Target';
import Walls from './Walls';

import GameElement from '../../gameElements/GameElement';
import SnakeElement from '../../gameElements/SnakeBrain';
import WallsElement from '../../gameElements/Walls';
import TargetElement from '../../gameElements/Target';
import { primaryColor, secondaryColor } from '../../utilities/styling';

const Background = styled.div`
  background-color: #424242;
`;

const Canvas = ({ snakes, walls, targets }) => {
  let canvasHeight;
  let canvasWidth;
  if (snakes) {
    canvasHeight = GameElement.NB_ROWS * snakes[0].squareSize;
    canvasWidth = GameElement.NB_COLUMNS * snakes[0].squareSize;
  }
  const snakeColors = [primaryColor, secondaryColor];
  return (
    <Background>
      <Stage width={canvasWidth} height={canvasHeight}>
        <Layer>
          {targets.map(target => <Target target={target} />)}
          {snakes.map((snake, index) => (
            <SnakeBody snake={snake} color={snakeColors[index]} />
          ))}
          <Walls walls={walls} />
        </Layer>
      </Stage>
    </Background>
  );
};

Canvas.propTypes = {
  snakes: PropTypes.arrayOf(PropTypes.instanceOf(SnakeElement).isRequired)
    .isRequired,
  walls: PropTypes.instanceOf(WallsElement).isRequired,
  targets: PropTypes.arrayOf(PropTypes.instanceOf(TargetElement).isRequired)
    .isRequired
};

export default Canvas;
