import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import PropTypes from 'prop-types';

import { Dialog, DialogTitle } from '../Dialog';
import { primaryColor } from '../../../utilities/styling';
import PlayerSetting from './PlayerSetting';
import ModeSetting from './ModeSetting';
import DifficultySetting from './DifficultySetting';
import LevelsSetting from './LevelSetting';

const PlayButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const styles = {
  buttons: {
    margin: '0 5%',
  },
  labelPlayButton: {
    fontWeight: '400',
  },
};


export default class Menu extends Component {
  state = {
    difficultyButtonsBgColor: [],
    modeButtonsBgColor: {classic: '#FFF', levels: '#FFF'},
    levelsButtonsBgColor: [],

  }

  static getDerivedStateFromProps(props, state) {
    const { difficulty, mode } = props.settings;
    let { modeButtonsBgColor } = state;
    if (mode === 'classic') {
      const difficultyButtonsBgColor = Menu.getBgColor(difficulty, 3);
      modeButtonsBgColor = {classic: primaryColor, levels: '#FFF'};
      return ({modeButtonsBgColor, difficultyButtonsBgColor});
    } else if (mode === 'levels') {
      const levelsButtonsBgColor = Menu.getBgColor(difficulty, 6);
      modeButtonsBgColor = {classic: '#FFF', levels: primaryColor};
      return ({levelsButtonsBgColor, modeButtonsBgColor})
    }
  }

  static getBgColor = (setting, listSize) => {
    const buttonsBgColor = new Array(listSize).fill('#FFF');
    buttonsBgColor[setting] = `${primaryColor}`;
    return (buttonsBgColor);
  }

  render() {
    const { onClickSettings, handleClickDifficulty, handleClickMode, settings } = this.props;
    const { 
      modeButtonsBgColor, 
      difficultyButtonsBgColor,
      levelsButtonsBgColor, 
    } = this.state;
    return (
      <Dialog>
        <DialogTitle>Snake Game</DialogTitle>

        <PlayerSetting/>
        <ModeSetting onClickMode={handleClickMode} buttonsBgColor={modeButtonsBgColor}/>

        { settings.mode === 'classic' ?
          <DifficultySetting 
            handleClickDifficulty={handleClickDifficulty} 
            buttonsBgColor={difficultyButtonsBgColor}/>
        : <LevelsSetting
            handleClickDifficulty={handleClickDifficulty} 
            buttonsBgColor={levelsButtonsBgColor}/>
        }
        

        <PlayButtonRow>
          <FlatButton
            label="Play"
            keyboardFocused
            primary
            labelStyle={styles.labelPlayButton}
            onClick={onClickSettings}
          />
        </PlayButtonRow>
      </Dialog>
    );
  }
}

