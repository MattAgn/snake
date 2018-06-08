import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import PropTypes from 'prop-types';
import { Modal } from '../../utilities/components';
import { primaryColor } from '../../utilities/styling';

const MenuContainer = styled(Modal)`
  padding: 2%;
  text-align: center;
  min-width: 36%;
  width: fit-content;
  height: fit-content;
  position: relative;
`;

const SettingRow = styled.div`
  margin: 7% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &:last-of-type{
    margin-bottom: 12%;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 4% 0;
  width: fit-content;
  min-width: 40%;
`;

const SettingTitle = styled.h3`
  display: block;
  margin-bottom: 1%;
`;

const GameName = styled.h1`
  font-weight: 400;
`;

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
  // static propTypes = {
  //   prop: PropTypes
  // }

  constructor() {
    super();
    console.log('yo');
  }


  render() {
    return (
      <MenuContainer>
        <GameName>Snake Game</GameName>

        <SettingRow>
          <SettingTitle> Player Mode</SettingTitle>
          <ButtonRow>
            <RaisedButton style={styles.buttons} backgroundColor={primaryColor}>1 player</RaisedButton>
            <RaisedButton style={styles.buttons} disabled>2 players</RaisedButton>
          </ButtonRow>
        </SettingRow>

        <SettingRow>
          <SettingTitle> Game Mode</SettingTitle>
          <ButtonRow>
            <RaisedButton style={styles.buttons} backgroundColor={primaryColor}>Classic</RaisedButton>
            <RaisedButton style={styles.buttons} disabled>Levels</RaisedButton>
          </ButtonRow>
        </SettingRow>

        <SettingRow>
          <SettingTitle> Difficulty</SettingTitle>
          <ButtonRow>
            <RaisedButton style={styles.buttons}>Easy</RaisedButton>
            <RaisedButton style={styles.buttons} backgroundColor={primaryColor}>Medium</RaisedButton>
            <RaisedButton style={styles.buttons}>Hell</RaisedButton>
          </ButtonRow>
        </SettingRow>

        <PlayButtonRow>
          <FlatButton
            label="Play"
            keyboardFocused
            primary
            labelStyle={styles.labelPlayButton}
          />
        </PlayButtonRow>
      </MenuContainer>
    );
  }
}

