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
            // value={0}
            name="difficulty"
            onClick={context.handleClickDifficulty(0)}
            isSelected={context.settings.difficulty === 0}
          />
          <SettingButton
            label="Medium"
            value={1}
            name="difficulty"
            onClick={context.handleClickDifficulty(1)}
            isSelected={context.settings.difficulty === 1}
          />
          <SettingButton
            label="Hell"
            // value={2}
            name="difficulty"
            onClick={context.handleClickDifficulty(2)}
            isSelected={context.settings.difficulty === 2}
          />
        </Fragment>
      </SettingRow>
    )}
  </GameContext.Consumer>
);

export default DifficultySetting;
