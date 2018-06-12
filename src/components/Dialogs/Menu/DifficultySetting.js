import React, { Fragment } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { primaryColor } from '../../../utilities/styling';
import SettingRow from './SettingRow';

const styles = {
  buttons: {
    margin: '0 5%',
  },
};

const DifficultySetting = ({ handleClickDifficulty, buttonsBgColor }) => (
  <SettingRow
    settingName="Difficulty"
    indication="Find your food in a map filled with random obstacles"
  >
    <Fragment>
      <RaisedButton
        label="Easy"
        style={styles.buttons}
        backgroundColor={buttonsBgColor[0]}
        onClick={handleClickDifficulty(0)}
      />
      <RaisedButton
        label="Medium"
        backgroundColor={buttonsBgColor[1]}
        style={styles.buttons}
        onClick={handleClickDifficulty(1)}
      />
      <RaisedButton
        label="Hell"
        backgroundColor={buttonsBgColor[2]}
        style={styles.buttons}
        onClick={handleClickDifficulty(2)}
      />
    </Fragment>
  </SettingRow>
);

export default DifficultySetting;