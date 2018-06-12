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
`;

const styles = {
  buttons: {
    margin: '0 5%',
  },
};

const LevelsSetting = ({ handleClickDifficulty, buttonsBgColor }) => (
  <LevelSettingRow
    settingName="Levels"
    indication="Reach a score of 70 to unlock the next level"
  >
    <ButtonRow>
      <RaisedButton
        label="1"
        style={styles.buttons}
        backgroundColor={buttonsBgColor[1]}
        onClick={handleClickDifficulty(1)}
      />
      <RaisedButton
        label="2"
        disabled
        backgroundColor={buttonsBgColor[2]}
        style={styles.buttons}
        onClick={handleClickDifficulty(2)}
      />
      <RaisedButton
        label="3"
        disabled
        backgroundColor={buttonsBgColor[3]}
        style={styles.buttons}
        onClick={handleClickDifficulty(3)}
      />
    </ButtonRow>
    <ButtonRow>
      <RaisedButton
        label="4"
        disabled
        style={styles.buttons}
        backgroundColor={buttonsBgColor[4]}
        onClick={handleClickDifficulty(4)}
      />
      <RaisedButton
        label="5"
        disabled
        backgroundColor={buttonsBgColor[5]}
        style={styles.buttons}
        onClick={handleClickDifficulty(5)}
      />
      <RaisedButton
        label="6"
        disabled
        backgroundColor={buttonsBgColor[6]}
        style={styles.buttons}
        onClick={handleClickDifficulty(6)}
      />
    </ButtonRow>
  </LevelSettingRow>
);

export default LevelsSetting;
