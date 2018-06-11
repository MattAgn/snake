import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { primaryColor } from '../../../utilities/styling';
import SettingRow from './SettingRow';

const styles = {
  buttons: {
    margin: '0 5%',
  },
};

const ModeSetting = ({ onClickMode }) => (
  <SettingRow settingName="Game Mode">
    <RaisedButton
      label="Classic"
      style={styles.buttons}
      backgroundColor={primaryColor}
      onClick={onClickMode('classic')}
    />
    <RaisedButton
      label="levels"
      style={styles.buttons}
      backgroundColor={primaryColor}
      onClick={onClickMode('levels')}
    />
  </SettingRow>
);

export default ModeSetting;
