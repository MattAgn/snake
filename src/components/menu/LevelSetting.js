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
            ? unlockLevelAfter(scoresNeeded[context.settings.difficulty + 1])
            : "Congrats you're one step away from finishing the game! But don't worry, new levels are coming soon! "
        }
      >
        <ButtonRow>
          <SettingButton
            label="1"
            value={1}
            name="difficulty"
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 1}
          />
          <SettingButton
            label="2"
            value={2}
            name="difficulty"
            disabled={!context.unlockedLevels[2]}
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 2}
          />
          <SettingButton
            label="3"
            value={3}
            name="difficulty"
            disabled={!context.unlockedLevels[3]}
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 3}
          />
        </ButtonRow>
        <ButtonRow>
          <SettingButton
            label="4"
            value={4}
            name="difficulty"
            disabled={!context.unlockedLevels[4]}
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 4}
          />
          <SettingButton
            label="5"
            value={5}
            name="difficulty"
            disabled={!context.unlockedLevels[5]}
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 5}
          />
          <SettingButton
            label="6"
            value={6}
            name="difficulty"
            disabled={!context.unlockedLevels[6]}
            onClick={context.handleClickDifficulty}
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
