import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { primaryColor } from '../../../utilities/styling';
import SettingRow from './SettingRow';

const styles = {
  buttons: {
    margin: '0 5%',
  },
};

const PlayerSetting = ({ onClickNbPlayers, buttonsBgColor }) => (
  <SettingRow settingName="Number of players">
    <RaisedButton
      label="1"
      style={styles.buttons}
      backgroundColor={buttonsBgColor[1]}
      onClick={onClickNbPlayers(1)}
    />
    <RaisedButton
      label="2"
      style={styles.buttons}
      backgroundColor={buttonsBgColor[2]}
      onClick={onClickNbPlayers(2)}
    />
  </SettingRow>
);

export default PlayerSetting;
