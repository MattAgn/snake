import React, { Fragment } from 'react';

import GameContext from '../../GameContext';

import SettingRow from './SettingRow';
import SettingButton from './SettingButton';

const DifficultySetting = () => (
  <GameContext.Consumer>
    {context => (
      <SettingRow
        settingName="Difficulty"
        indication="Find your food in a map filled with random obstacles"
      >
        <Fragment>
          <SettingButton
            label="Easy"
            value={0}
            name="classic"
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 0}
          />
          <SettingButton
            label="Medium"
            value={1}
            name="classic"
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 1}
          />
          <SettingButton
            label="Hell"
            value={2}
            name="classic"
            onClick={context.handleClickDifficulty}
            isSelected={context.settings.difficulty === 2}
          />
        </Fragment>
      </SettingRow>
    )}
  </GameContext.Consumer>
);

export default DifficultySetting;
