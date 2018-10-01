import React from 'react';
import styled from 'styled-components';
import HomeIcon from 'material-ui/svg-icons/action/home';
import RetryIcon from 'material-ui/svg-icons/av/replay';
import NextIcon from 'material-ui/svg-icons/navigation/arrow-forward';
import PropTypes from 'prop-types';
import { config } from 'react-spring';

import { primaryColor } from '../../utilities/styling';
import GameContext from '../../GameContext';
import { StyledModal, ModalTitle } from '../common/StyledModal';

import Button from './Button';

const GameOver = () => (
  <GameContext.Consumer>
    {context => (
      <GameOverModal isOpen={context.isGameOver} config={config.gentle}>
        <ModalTitle>
          {context.hasUnlockedLevel
            ? 'Congrats! You unlocked the next level!'
            : 'Game Over!'}
        </ModalTitle>
        <ScoresRow>
          <ScoreItem>Score: {context.score}</ScoreItem>
          <ScoreItem>High Score: {context.currentHighScore}</ScoreItem>
        </ScoresRow>
        <ButtonContainer>
          {context.hasUnlockedLevel && (
            <Button onClick={context.handleClickNextLevel} title="Next level">
              <NextIcon color={primaryColor} style={iconStyle} />
            </Button>
          )}
          <Button onClick={context.handleClickRetry} title="Retry">
            <RetryIcon color={primaryColor} style={iconStyle} />
          </Button>
          <Button onClick={context.handleClickSettings} title="Menu">
            <HomeIcon color={primaryColor} style={iconStyle} />
          </Button>
        </ButtonContainer>
      </GameOverModal>
    )}
  </GameContext.Consumer>
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

const GameOverModal = styled(StyledModal)`
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
  min-width: 40%;
  flex-wrap: wrap;
`;

export default GameOver;
