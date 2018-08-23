import React from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';

import { primaryColor } from '../../utilities/styling';
import SettingRow from './SettingRow';

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  min-width: 40%;
  &:first-of-type {
    margin-bottom: 4%;
  }
`;

const LevelSettingRow = styled(SettingRow)`
  flex-direction: column;
`;

const styles = {
  buttons: {
    margin: '0 5%'
  }
};

const unlockLevelAfter = scoreNeeded =>
  `Eat ${scoreNeeded} targets to unlock the next level`;

const scoresNeeded = [70, 60, 50, 40, 40];

const LevelsSetting = ({
  handleClickDifficulty,
  buttonsBgColor,
  settings,
  highScores
}) => {
  const isLevelUnlocked = level =>
    highScores[settings.nbPlayers].levels[level] > scoresNeeded[level - 2];

  return (
    <LevelSettingRow
      settingName="Levels"
      indication={
        settings.difficulty >= 5 &&
        unlockLevelAfter(scoresNeeded[settings.difficulty - 1])
      }
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
          disabled={!isLevelUnlocked(2, highScores)}
          backgroundColor={buttonsBgColor[2]}
          style={styles.buttons}
          onClick={handleClickDifficulty(2)}
        />
        <RaisedButton
          label="3"
          disabled={!isLevelUnlocked(3, highScores)}
          backgroundColor={buttonsBgColor[3]}
          style={styles.buttons}
          onClick={handleClickDifficulty(3)}
        />
      </ButtonRow>
      <ButtonRow>
        <RaisedButton
          label="4"
          disabled={!isLevelUnlocked(4, highScores)}
          style={styles.buttons}
          backgroundColor={buttonsBgColor[4]}
          onClick={handleClickDifficulty(4)}
        />
        <RaisedButton
          label="5"
          disabled={!isLevelUnlocked(5, highScores)}
          backgroundColor={buttonsBgColor[5]}
          style={styles.buttons}
          onClick={handleClickDifficulty(5)}
        />
        <RaisedButton
          label="6"
          // disabled={!isLevelUnlocked(6, highScores)}
          backgroundColor={buttonsBgColor[6]}
          style={styles.buttons}
          onClick={handleClickDifficulty(6)}
        />
      </ButtonRow>
    </LevelSettingRow>
  );
};

export default LevelsSetting;
