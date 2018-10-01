import React from 'react';
import { Stage, Layer } from 'react-konva';
import styled from 'styled-components';

import GameElement from '../../game-logic/GameElementModel';
import { primaryColor, secondaryColor } from '../../utilities/styling';
import GameContext from '../../GameContext';

import SnakeBody from './SnakeBody';
import Target from './Target';
import Walls from './Walls';

const Canvas = () => {
  const snakeColors = [primaryColor, secondaryColor];
  return (
    <GameContext.Consumer>
      {context => (
        <Background>
          <Stage
            width={context.squareSize * GameElement.NB_COLUMNS}
            height={context.squareSize * GameElement.NB_ROWS}
          >
            {context.gameElements && (
              <Layer>
                {context.gameElements.targets.map(target => (
                  <Target target={target} />
                ))}
                {context.gameElements.snakes.map((snake, index) => (
                  <SnakeBody snake={snake} color={snakeColors[index]} />
                ))}
                <Walls walls={context.gameElements.walls} />
              </Layer>
            )}
          </Stage>
        </Background>
      )}
    </GameContext.Consumer>
  );
};

const Background = styled.div`
  background-color: #424242;
`;
export default Canvas;
