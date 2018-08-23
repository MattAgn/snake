import React from 'react';
import styled from 'styled-components';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import RetryIcon from 'material-ui/svg-icons/av/replay';
import NextIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import PropTypes from 'prop-types';

import { primaryColor } from '../../utilities/styling';
import { Dialog, DialogTitle } from '../common/Dialog';

import Button from './Button';

const GameOver = ({
  score,
  highScore,
  onClickRetry,
  onClickNextLevel,
  onClickSettings,
  hasUnlockedLevel
}) => (
  <Dialog>
    <DialogTitle>Game Over !</DialogTitle>
    <ScoresRow>
      <ScoreItem>Score: {score}</ScoreItem>
      <ScoreItem>High Score: {highScore}</ScoreItem>
    </ScoresRow>
    <ButtonContainer>
      {hasUnlockedLevel && (
        <Button onClick={onClickNextLevel} isPrimary>
          <NextIcon color="#FFF" />
        </Button>
      )}
      <Button onClick={onClickRetry} isPrimary={!hasUnlockedLevel}>
        <RetryIcon color={hasUnlockedLevel ? primaryColor : '#FFF'} />
      </Button>
      <Button onClick={onClickSettings} isPrimary={false}>
        <SettingsIcon color={primaryColor} />
      </Button>
    </ButtonContainer>
  </Dialog>
);

GameOver.propTypes = {
  onClickRetry: PropTypes.func.isRequired,
  onClickSettings: PropTypes.func.isRequired,
  onClickNextLevel: PropTypes.func,
  score: PropTypes.number.isRequired,
  highScore: PropTypes.number.isRequired,
  hasUnlockedLevel: PropTypes.bool
};

GameOver.defaultProps = {
  onClickNextLevel: null,
  hasUnlockedLevel: false
};

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

export default GameOver;
