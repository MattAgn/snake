import React from 'react';
import PropTypes from 'prop-types';
import { Circle } from 'react-konva';
import TargetModel from '../../game-logic/TargetModel';

const Target = ({ target }) => (
  <Circle
    x={target.x}
    y={target.y}
    key={target.id}
    radius={target.squareSize / 2}
    fill="red"
  />
);

export default Target;

Target.propTypes = {
  target: PropTypes.instanceOf(TargetModel).isRequired
};
