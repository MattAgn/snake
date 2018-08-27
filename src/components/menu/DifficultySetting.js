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
            onClick={context.handleClickDifficulty(0)}
            isSelected={context.settings.difficulty === 0}
          />
          <SettingButton
            label="Medium"
            onClick={context.handleClickDifficulty(1)}
            isSelected={context.settings.difficulty === 1}
          />
          <SettingButton
            label="Hell"
            onClick={context.handleClickDifficulty(2)}
            isSelected={context.settings.difficulty === 2}
          />
        </Fragment>
      </SettingRow>
    )}
  </GameContext.Consumer>
);

export default DifficultySetting;
