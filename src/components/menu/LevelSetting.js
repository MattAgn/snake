import React from 'react';
import styled from 'styled-components';

import GameContext from '../../GameContext';
import { scoresNeeded } from '../../utilities/helpers/constants';

import SettingRow from './SettingRow';
import SettingButton from './SettingButton';

const LevelsSetting = () => (
  <GameContext.Consumer>
    {context => (
      <LevelSettingRow
        settingName="Levels"
        indication={
          context.settings.difficulty <= 5
            ? unlockLevelAfter(scoresNeeded[context.settings.difficulty - 1])
            : "Congrats you finished the game! But don't worry, new levels coming soon! "
        }
      >
        <ButtonRow>
          <SettingButton
            label="1"
            onClick={context.handleClickDifficulty(1)}
            isSelected={context.settings.difficulty === 1}
          />
          <SettingButton
            label="2"
            // disabled={!isLevelUnlocked(2, highScores)}
            onClick={context.handleClickDifficulty(2)}
            isSelected={context.settings.difficulty === 2}
          />
          <SettingButton
            label="3"
            // disabled={!isLevelUnlocked(3, highScores)}
            onClick={context.handleClickDifficulty(3)}
            isSelected={context.settings.difficulty === 3}
          />
        </ButtonRow>
        <ButtonRow>
          <SettingButton
            label="4"
            // disabled={!isLevelUnlocked(4, highScores)}
            onClick={context.handleClickDifficulty(4)}
            isSelected={context.settings.difficulty === 4}
          />
          <SettingButton
            label="5"
            // disabled={!isLevelUnlocked(5, highScores)}
            onClick={context.handleClickDifficulty(5)}
            isSelected={context.settings.difficulty === 5}
          />
          <SettingButton
            label="6"
            // disabled={!isLevelUnlocked(6, highScores)}

            onClick={context.handleClickDifficulty(6)}
            isSelected={context.settings.difficulty === 6}
          />
        </ButtonRow>
      </LevelSettingRow>
    )}
  </GameContext.Consumer>
);

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 40%;
  &:first-of-type {
    margin-bottom: 4%;
  }
`;

const LevelSettingRow = styled(SettingRow)`
  flex-direction: column;
`;

const unlockLevelAfter = scoreNeeded =>
  `Eat ${scoreNeeded} targets to unlock the next level`;

// const isLevelUnlocked = level =>
//   highScores[settings.nbPlayers].levels[level] > scoresNeeded[level - 2];

export default LevelsSetting;
