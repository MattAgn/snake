import React from 'react';
// import PropTypes from 'prop-types';
import { Circle } from 'react-konva';

const Target = target => (
  <Circle
    x={target.x}
    y={target.y}
    radius={target.squareSize / 2}
    fill="red"
  />
);

export default Target;

// Target.propTypes = {

// };
