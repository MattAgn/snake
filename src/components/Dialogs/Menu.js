import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
// import PropTypes from 'prop-types';
import { Modal } from '../../elements';
import { primaryColor } from '../../utilities/styling';

const modalStyle = {
  padding: '2%',
  textAlign: 'center',
  width: 'fit-content(90%)',
  minWidth: '40%',
  height: 'fit-content',
};

const buttonStyle = {
  margin: '0 5%',
};

const SettingRow = styled.div`
  margin: 7% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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
      <Modal style={modalStyle}>
        <GameName>Snake Game</GameName>

        <SettingRow>
          <SettingTitle> Player Mode</SettingTitle>
          <ButtonRow>
            <RaisedButton style={buttonStyle} backgroundColor={primaryColor}>1 player</RaisedButton>
            <RaisedButton style={buttonStyle} disabled>2 players</RaisedButton>
          </ButtonRow>
        </SettingRow>

        <SettingRow>
          <SettingTitle> Game Mode</SettingTitle>
          <ButtonRow>
            <RaisedButton style={buttonStyle} backgroundColor={primaryColor}>Classic</RaisedButton>
            <RaisedButton style={buttonStyle} disabled>Levels</RaisedButton>
          </ButtonRow>
        </SettingRow>

        <SettingRow>
          <SettingTitle> Difficulty</SettingTitle>
          <ButtonRow>
            <RaisedButton style={buttonStyle}>Easy</RaisedButton>
            <RaisedButton style={buttonStyle} backgroundColor={primaryColor}>Medium</RaisedButton>
            <RaisedButton style={buttonStyle}>Hell</RaisedButton>
          </ButtonRow>
        </SettingRow>
      </Modal>
    );
  }
}

