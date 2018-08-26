import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'react-konva';

import WallsModel from '../../game-logic/WallsModel';

class Walls extends Component {
  static propTypes = {
    walls: PropTypes.instanceOf(WallsModel).isRequired
  };

  componentDidUpdate(prevProps) {
    if (prevProps.walls !== this.props.walls) {
      return true;
    }
    return false;
  }

  render() {
    const { walls } = this.props;
    return (
      <React.Fragment>
        {walls.coordinatesList.map(wall => (
          <Rect
            key={wall.id}
            x={wall.x}
            y={wall.y}
            height={walls.squareSize}
            width={walls.squareSize}
            fill="black"
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Walls;
