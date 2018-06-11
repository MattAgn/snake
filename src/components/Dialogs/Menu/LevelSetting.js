import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import { primaryColor } from '../../../utilities/styling';
import SettingRow from './SettingRow';

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 40%;
  &:first-of-type{
    margin-bottom: 4%;
  }
`;

const LevelSettingRow = styled(SettingRow)`
  flex-direction: column;
  margin-bottom: 0;
`;

const styles = {
  buttons: {
    margin: '0 5%',
  },
};

const LevelsSetting = ({ handleClickDifficulty, buttonsBgColor }) => (
  <LevelSettingRow settingName="Levels">
    <ButtonRow>
      <RaisedButton
        label="1"
        style={styles.buttons}
        backgroundColor={buttonsBgColor[0]}
        onClick={handleClickDifficulty(0)}
      />
      <RaisedButton
        label="2"
        disabled
        backgroundColor={buttonsBgColor[1]}
        style={styles.buttons}
        onClick={handleClickDifficulty(1)}
      />
      <RaisedButton
        label="3"
        disabled
        backgroundColor={buttonsBgColor[2]}
        style={styles.buttons}
        onClick={handleClickDifficulty(2)}
      />
    </ButtonRow>
    <ButtonRow>
      <RaisedButton
        label="4"
        disabled
        style={styles.buttons}
        backgroundColor={buttonsBgColor[0]}
        onClick={handleClickDifficulty(0)}
      />
      <RaisedButton
        label="5"
        disabled
        backgroundColor={buttonsBgColor[1]}
        style={styles.buttons}
        onClick={handleClickDifficulty(1)}
      />
      <RaisedButton
        label="6"
        disabled
        backgroundColor={buttonsBgColor[2]}
        style={styles.buttons}
        onClick={handleClickDifficulty(2)}
      />
    </ButtonRow>
  </LevelSettingRow>
);

export default LevelsSetting;
