import React from 'react';
import GameContext from '../../GameContext';

import SettingRow from './SettingRow';
import SettingButton from './SettingButton';

const ModeSetting = () => (
  <GameContext.Consumer>
    {context => (
      <SettingRow settingName="Game Mode">
        <SettingButton
          label="Classic"
          value="classic"
          onClick={context.handleClickMode}
          isSelected={context.settings.mode === 'classic'}
        />
        <SettingButton
          label="Levels"
          value="levels"
          onClick={context.handleClickMode}
          isSelected={context.settings.mode === 'levels'}
        />
      </SettingRow>
    )}
  </GameContext.Consumer>
);

export default ModeSetting;
