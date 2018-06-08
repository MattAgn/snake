import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';

import { lightGrey } from '../../utilities/styling';
import { Toggle } from '../../utilities/components';
import Menu from '../Dialogs/Menu';

const Row = styled.div`
  display: flex;
  margin: 3% auto 0 auto;
  width: 95%;
  justify-content: center;
  position: relative;
`;

const Information = styled.div`
  color: white;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 1.8em;
  margin: 0 5%;
`;

const styles = {
  button: {
    height: 30,
    width: 30,
    padding: 0,
    position: 'absolute',
    top: '0',
    right: '0',
  },
  icon: {
    height: 30,
    width: 30,
  },
};

const Header = ({ score, highScore, ...settingsProps }) => (
  <Row>
    <Information>Score : {score}</Information>
    <Information>High Score : {highScore}</Information>
    <Toggle>
      {({ toggle, on }) => (
        <IconButton style={styles.button} iconStyle={styles.icon} onClick={toggle}>
          <SettingsIcon color={lightGrey} />
          { on && <Menu onClick={toggle} />}
        </IconButton>
      )}
    </Toggle>
  </Row>
);

Header.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
};

export default Header;
