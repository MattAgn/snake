import React, { Component } from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import { config } from 'react-spring';

import { StyledModal, ModalTitle } from '../common/StyledModal';
import GameContext from '../../GameContext';

import PlayerSetting from './PlayerSetting';
import ModeSetting from './ModeSetting';
import DifficultySetting from './DifficultySetting';
import LevelsSetting from './LevelSetting';

const Menu = () => (
  <GameContext.Consumer>
    {context => (
      <StyledModal isOpen={context.isMenuOpened} config={config.slow}>
        <ModalTitle>Snake Game</ModalTitle>

        <PlayerSetting />

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
        </PlayButtonRow>
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
