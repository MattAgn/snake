import React from 'react';
import styled from 'styled-components';
import HomeIcon from 'material-ui/svg-icons/action/home';
import IconButton from 'material-ui/IconButton';
import PlayArrowIcon from 'material-ui/svg-icons/av/play-arrow';
import PauseIcon from 'material-ui/svg-icons/av/pause';

import { lightGrey, absolute } from '../../utilities/styling';
import GameContext from '../../GameContext';

function preventFocus(e) {
  console.log('clicked button');
  e.preventDefault();
}

function getMode(settings) {
  if (settings.mode === 'classic') {
    if (settings.difficulty === 0) {
      return '( Easy )';
    } else if (settings.difficulty === 1) {
      return '( Medium )';
    } else if (settings.difficulty === 2) {
      return '( Hell )';
    }
  } else if (settings.mode === 'levels') {
    return `( Level ${settings.difficulty} )`;
  }
  return '';
}

const Header = () => (
  <GameContext.Consumer>
    {context => (
      <Row>
        <Information>Score: {context.score}</Information>
        <Information>
          High Score: {context.currentHighScore} {getMode(context.settings)}
        </Information>
        <ButtonsContainer>
          <IconButton
            style={styles.button}
            iconStyle={styles.icon}
            onClick={context.handlePauseGame}
          >
            {context.isGamePaused ? (
              <PlayArrowIcon color={lightGrey} />
            ) : (
              <PauseIcon color={lightGrey} />
            )}
          </IconButton>
          <IconButton
            style={styles.button}
            iconStyle={styles.icon}
            onClick={context.handleClickSettings}
            onKeyboardFocus={preventFocus}
          >
            <HomeIcon color={lightGrey} />
          </IconButton>
        </ButtonsContainer>
      </Row>
    )}
  </GameContext.Consumer>
);

const Row = styled.div`
  display: flex;
  margin: 0 auto;
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
    margin: '0 10%'
  },
  icon: {
    height: 30,
    width: 30
  }
};

export default Header;
