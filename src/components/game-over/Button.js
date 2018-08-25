import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconButton } from 'material-ui';

import { primaryColor, elevation, tintColor } from '../../utilities/styling';

const Button = ({ onClick, children }) => (
  <StyledButton onClick={onClick}>{children}</StyledButton>
);

const StyledButton = styled.button`
  cursor: pointer;
  height: 120px;
  width: 120px;
  padding: 5%;
  margin: 5%;
  border-radius: 7px;
  border-style: solid;
  border-width: 3px;
  border-color: ${primaryColor};
  background-color: #fff;
  color: ${primaryColor};
  ${elevation[3]};
  &:hover,
  &:focus {
    background-color: ${tintColor};
    border-color: ${tintColor};
    ${elevation[4]};
    transition: box-shadow 300ms ease-in-out;
  }
  &:hover :first-child,
  &:focus:first-child {
    fill: #fff !important;
  }
`;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.array.isRequired,
  isPrimary: PropTypes.bool.isRequired
};

export default StyledButton;
