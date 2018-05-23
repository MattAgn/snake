import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Rect } from 'konva';

class Snake extends Component {
  // static propTypes = {
  //   prop: PropTypes
  // }


  render() {
    return (
      <Rect
        {...this.props}
        fill="#8BC34A"
      />
    );
  }
}

export default Snake;
