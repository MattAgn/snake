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
  <StyledDialog>
    <DialogTitle>
      {hasUnlockedLevel
        ? 'Congrats! You unlocked the next level!'
        : 'Game Over!'}
    </DialogTitle>
    <ScoresRow>
      <ScoreItem>Score: {score}</ScoreItem>
      <ScoreItem>High Score: {highScore}</ScoreItem>
    </ScoresRow>
    <ButtonContainer>
      {hasUnlockedLevel && (
        <Button onClick={onClickNextLevel} isPrimary title="Next level">
          <NextIcon color="#FFF" style={iconStyle} />
        </Button>
      )}
      <Button
        onClick={onClickRetry}
        isPrimary={!hasUnlockedLevel}
        title="Retry"
      >
        <RetryIcon
          color={hasUnlockedLevel ? primaryColor : '#FFF'}
          style={iconStyle}
        />
      </Button>
      <Button onClick={onClickSettings} isPrimary={false} title="Options">
        <SettingsIcon color={primaryColor} style={iconStyle} />
      </Button>
    </ButtonContainer>
  </StyledDialog>
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
  hasUnlockedLevel: true
};

const iconStyle = {
  height: '100%',
  width: '100%'
};

const StyledDialog = styled(Dialog)`
  padding: 4% 5%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;

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
  justify-content: space-evenly;
  /* flex-wrap: wrap; */
  /* width: fit-content; */
  min-width: 40%;
`;

export default GameOver;
