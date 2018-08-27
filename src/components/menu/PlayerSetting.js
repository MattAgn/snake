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
          onClick={context.handleClickNbPlayers(1)}
          isSelected={context.settings.nbPlayers === 1}
        />
        <SettingButton
          label="Coop"
          onClick={context.handleClickNbPlayers(2)}
          isSelected={context.settings.nbPlayers === 2}
        />
      </SettingRow>
    )}
  </GameContext.Consumer>
);

export default PlayerSetting;
