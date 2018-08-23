import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from 'material-ui';

import { primaryColor, elevation } from '../../utilities/styling';

const Button = ({ onClick, children }) => (
  <div
    onClick={onClick}
    iconStyle={{ height: 100, width: 100 }}
    // style={style}
  >
    {children}
  </div>
);

const StyledButton = styled(Button)`
  cursor: pointer;
  height: fit-content !important;
  width: fit-content !important;
  padding: 5% !important;
  margin: 5% !important;
  border-radius: 5 !important;
  border-style: 'solid' !important;
  border-width: 3 !important;
  border-color: ${primaryColor} !important;
  background-color: ${props =>
    (props.isPrimary ? primaryColor : '#FFF')} !important;
  color: ${props => (props.isPrimary ? '#FFF' : primaryColor)} !important;
  ${elevation[4]};
`;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  className: PropTypes.number.isRequired,
  isPrimary: PropTypes.bool.isRequired
};

const style = {
  height: 'fit-content',
  width: 'fit-content',
  padding: '2%',
  margin: '5%',
  color: props => (props.isPrimary ? '#FFF' : primaryColor),
  borderRadius: 5,
  borderColor: primaryColor,
  borderWidth: 3
};

export default StyledButton;
