import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { config } from 'react-spring';

import { primaryColor } from '../../utilities/styling';
import { StyledModal, ModalTitle } from '../common/StyledModal';
import GameContext from '../../GameContext';

import PlayerSetting from './PlayerSetting';
import ModeSetting from './ModeSetting';
import DifficultySetting from './DifficultySetting';
import LevelsSetting from './LevelSetting';

// state = {
//   difficultyButtonsBgColor: [],
//   modeButtonsBgColor: { classic: '#FFF', levels: '#FFF' },
//   levelsButtonsBgColor: [],
//   playersButtonsBgColor: { 1: '#FFF', 2: '#FFF' }
// };

// static getDerivedStateFromProps(props, state) {
//   const { difficulty, mode, nbPlayers } = props.settings;
//   let { modeButtonsBgColor } = state;
//   let playersButtonsBgColor = { 1: '#FFF', 2: '#FFF' };
//   playersButtonsBgColor[nbPlayers] = primaryColor;
//   if (mode === 'classic') {
//     const difficultyButtonsBgColor = Menu.getBgColor(difficulty, 3);
//     modeButtonsBgColor = { classic: primaryColor, levels: '#FFF' };
//     return {
//       modeButtonsBgColor,
//       difficultyButtonsBgColor,
//       playersButtonsBgColor
//     };
//   } else if (mode === 'levels') {
//     const levelsButtonsBgColor = Menu.getBgColor(difficulty, 6);
//     modeButtonsBgColor = { classic: '#FFF', levels: primaryColor };
//     return {
//       levelsButtonsBgColor,
//       modeButtonsBgColor,
//       playersButtonsBgColor
//     };
//   }
// }

// static getBgColor = (setting, listSize) => {
//   const buttonsBgColor = new Array(listSize).fill('#FFF');
//   buttonsBgColor[setting] = `${primaryColor}`;
//   return buttonsBgColor;
// };

// const {
//   modeButtonsBgColor,
//   difficultyButtonsBgColor,
//   levelsButtonsBgColor,
//   playersButtonsBgColor
// } = this.state;
const Menu = () => (
  <GameContext.Consumer>
    {context => (
      <StyledModal isOpen={context.isMenuOpen} config={config.slow}>
        <ModalTitle>Snake Game</ModalTitle>

        {/* <PlayerSetting />

        <ModeSetting />

        {context.settings.mode === 'classic' ? (
          <DifficultySetting />
        ) : (
          <LevelsSetting />
        )}

        <PlayButtonRow>
          <FlatButton
            label="Play"
            keyboardFocused
            primary
            labelStyle={styles.labelPlayButton}
            onClick={context.handleClickSettings}
          />
        </PlayButtonRow> */}
      </StyledModal>
    )}
  </GameContext.Consumer>
);

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
