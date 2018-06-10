import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';

import { lightGrey, absolute } from '../../utilities/styling';
import Menu from '../Dialogs/Menu';

const Row = styled.div`
  display: flex;
  margin: 2% auto 0 auto;
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

const ButtonsContainer = styled.div`
  ${absolute({ y: 'top', x: 'right' })};
  display: flex;
  padding: 0 2%;
`;

const styles = {
  button: {
    height: 30,
    width: 30,
    padding: 0,
    margin: '0 10%',
  },
  icon: {
    height: 30,
    width: 30,
  },
};

function preventFocus(e) {
  e.preventDefault();
}

const Header = ({
  score, highScore, isMenuOpened, isGamePaused, onClickPlay, onClickSettings, ...settingsProps
}) => (
  <Row>
    <Information>Score : {score}</Information>
    <Information>High Score : {highScore}</Information>
    <ButtonsContainer>

      <IconButton
        style={styles.button}
        iconStyle={styles.icon}
        onClick={onClickPlay}
        onMouseDown={preventFocus}
      >
        { isGamePaused ?
          <PlayArrowIcon color={lightGrey} />
          : <PauseIcon color={lightGrey} />}
      </IconButton>
      <IconButton style={styles.button} iconStyle={styles.icon} onClick={onClickSettings} >
        <SettingsIcon color={lightGrey} />
      </IconButton>
    </ButtonsContainer>
    { isMenuOpened && <Menu {...settingsProps} onClickSettings={onClickSettings} />}
  </Row>
);

Header.propTypes = {
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  isMenuOpened: PropTypes.bool.isRequired,
};

export default Header;
