import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { primaryColor } from '../../../utilities/styling';
import SettingRow from './SettingRow';

const styles = {
  buttons: {
    margin: '0 5%',
  },
};

const PlayerSetting = () => (
  <SettingRow settingName="Player Mode">
    <RaisedButton style={styles.buttons} backgroundColor={primaryColor}>1 player</RaisedButton>
    <RaisedButton style={styles.buttons} disabled>2 players</RaisedButton>
  </SettingRow>
);

export default PlayerSetting;
