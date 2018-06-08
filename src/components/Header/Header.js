import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';

const Row = styled.div`

`;

const Header = ({ score, highScore }) => (
  <Row>
    <h2>Score : {score}</h2>
    <h2>High Score : {highScore}</h2>
    <IconButton>
      <SettingsIcon />
    </IconButton>
  </Row>
);

Header.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Header;
