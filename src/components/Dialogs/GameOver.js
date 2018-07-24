import React from 'react';
import styled from 'styled-components';
import { IconButton } from 'material-ui';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import RetryIcon from 'material-ui/svg-icons/av/replay';
// import PropTypes from 'prop-types';
import { Dialog, DialogTitle } from './Dialog';
import { primaryColor, elevation } from '../../utilities/styling';

const ScoresRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 7%;
`;

const ScoreItem = styled.h2`
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4% 0;
  width: fit-content;
  min-width: 40%;
  width: 100%;
`;

const styles = {
  button: {
    height: 125,
    width: 125,
    padding: '0',
    margin: '5%',
    borderRadius: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    borderColor: `${primaryColor}`
  },
  icon: {
    height: 100,
    width: 100
  }
};

const GameOver = ({ score, highScore, onClickRetry, onClickSettings }) => (
  <Dialog>
    <DialogTitle>Game Over !</DialogTitle>
    <ScoresRow>
      <ScoreItem>Score: {score}</ScoreItem>
      <ScoreItem>High Score: {highScore}</ScoreItem>
    </ScoresRow>
    <ButtonContainer>
      <IconButton
        style={{
          ...styles.button,
          backgroundColor: `${primaryColor}`,
          boxShadow:
            '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'
        }}
        iconStyle={styles.icon}
        onClick={onClickRetry}
      >
        <RetryIcon color="#FFF" />
      </IconButton>
      <IconButton
        style={{ ...styles.button }}
        iconStyle={styles.icon}
        onClick={onClickSettings}
      >
        <SettingsIcon color={primaryColor} />
      </IconButton>
    </ButtonContainer>
  </Dialog>
);

export default GameOver;
