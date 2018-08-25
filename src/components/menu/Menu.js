import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { config } from 'react-spring';
// import PropTypes from 'prop-types';

import { primaryColor } from '../../utilities/styling';
import { StyledModal, ModalTitle } from '../common/StyledModal';

import PlayerSetting from './PlayerSetting';
import ModeSetting from './ModeSetting';
import DifficultySetting from './DifficultySetting';
import LevelsSetting from './LevelSetting';

class Menu extends Component {
  state = {
    difficultyButtonsBgColor: [],
    modeButtonsBgColor: { classic: '#FFF', levels: '#FFF' },
    levelsButtonsBgColor: [],
    playersButtonsBgColor: { 1: '#FFF', 2: '#FFF' }
  };

  static getDerivedStateFromProps(props, state) {
    const { difficulty, mode, nbPlayers } = props.settings;
    let { modeButtonsBgColor } = state;
    let playersButtonsBgColor = { 1: '#FFF', 2: '#FFF' };
    playersButtonsBgColor[nbPlayers] = primaryColor;
    if (mode === 'classic') {
      const difficultyButtonsBgColor = Menu.getBgColor(difficulty, 3);
      modeButtonsBgColor = { classic: primaryColor, levels: '#FFF' };
      return {
        modeButtonsBgColor,
        difficultyButtonsBgColor,
        playersButtonsBgColor
      };
    } else if (mode === 'levels') {
      const levelsButtonsBgColor = Menu.getBgColor(difficulty, 6);
      modeButtonsBgColor = { classic: '#FFF', levels: primaryColor };
      return {
        levelsButtonsBgColor,
        modeButtonsBgColor,
        playersButtonsBgColor
      };
    }
  }

  static getBgColor = (setting, listSize) => {
    const buttonsBgColor = new Array(listSize).fill('#FFF');
    buttonsBgColor[setting] = `${primaryColor}`;
    return buttonsBgColor;
  };

  render() {
    const {
      onClickSettings,
      handleClickDifficulty,
      handleClickMode,
      handleClickNbPlayers,
      settings,
      highScores,
      isMenuOpen
    } = this.props;
    const {
      modeButtonsBgColor,
      difficultyButtonsBgColor,
      levelsButtonsBgColor,
      playersButtonsBgColor
    } = this.state;
    return (
      <StyledModal isOpen={isMenuOpen} config={config.slow}>
        <ModalTitle>Snake Game</ModalTitle>

        <PlayerSetting
          onClickNbPlayers={handleClickNbPlayers}
          buttonsBgColor={playersButtonsBgColor}
        />

        <ModeSetting
          onClickMode={handleClickMode}
          buttonsBgColor={modeButtonsBgColor}
        />

        {settings.mode === 'classic' ? (
          <DifficultySetting
            handleClickDifficulty={handleClickDifficulty}
            buttonsBgColor={difficultyButtonsBgColor}
          />
        ) : (
          <LevelsSetting
            settings={settings}
            highScores={highScores}
            handleClickDifficulty={handleClickDifficulty}
            buttonsBgColor={levelsButtonsBgColor}
          />
        )}

        <PlayButtonRow>
          <FlatButton
            label="Play"
            keyboardFocused
            primary
            labelStyle={styles.labelPlayButton}
            onClick={onClickSettings}
          />
        </PlayButtonRow>
      </StyledModal>
    );
  }
}

const PlayButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const styles = {
  buttons: {
    margin: '0 5%'
  },
  labelPlayButton: {
    fontWeight: '400'
  }
};

export default Menu;
