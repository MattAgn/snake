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
    buttonsBgColor: [],
  }

  static getDerivedStateFromProps(props) {
    const buttonsBgColor = new Array(3).fill('#FFF');
    buttonsBgColor[props.settings.difficulty] = `${primaryColor}`;
    return ({ buttonsBgColor });
  }

  render() {
    const { onClickSettings, handleClickDifficulty, handleClickMode, settings } = this.props;
    const { buttonsBgColor } = this.state;
    return (
      <Dialog>
        <DialogTitle>Snake Game</DialogTitle>

        <PlayerSetting/>
        <ModeSetting onClickMode={handleClickMode}/>

        { settings.mode === 'classic' ?
          <DifficultySetting 
            handleClickDifficulty={handleClickDifficulty} 
            buttonsBgColor={buttonsBgColor}/>
        : <LevelsSetting
            handleClickDifficulty={handleClickDifficulty} 
            buttonsBgColor={buttonsBgColor}/>
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

