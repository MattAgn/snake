import React from 'react';

import GameContext from '../../GameContext';
import SettingRow from './SettingRow';
import SettingButton from './SettingButton';
import { primaryColor } from '../../utilities/styling';

const PlayerSetting = () => (
  <GameContext.Consumer>
    {context => (
      <SettingRow settingName="Players Mode">
        <SettingButton
          label="Solo"
          value={1}
          onClick={context.handleClickNbPlayers}
          isSelected={context.settings.nbPlayers === 1}
        />
        <SettingButton
          label="Coop"
          value={2}
          onClick={context.handleClickNbPlayers}
          isSelected={context.settings.nbPlayers === 2}
        />
      </SettingRow>
    )}
  </GameContext.Consumer>
);

export default PlayerSetting;
