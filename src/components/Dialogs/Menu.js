import React, { Component } from 'react';
import styled from 'styled-components';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import PropTypes from 'prop-types';
import { Dialog, DialogTitle } from './Dialog';
import { primaryColor } from '../../utilities/styling';


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

const PlayButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const styles = {
  buttons: {
    margin: '0 5%',
    color: 'black',
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
    const { onClickSettings, onClickDifficulty } = this.props;
    return (
      <Dialog>
        <DialogTitle>Snake Game</DialogTitle>

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
            <RaisedButton
              label="Easy"
              style={styles.buttons}
              onClick={onClickDifficulty('easy')}
            />
            <RaisedButton
              label="Medium"
              style={styles.buttons}
              backgroundColor={primaryColor}
              onClick={onClickDifficulty('medium')}
            />
            <RaisedButton
              label="Hell"
              style={styles.buttons}
              onClick={onClickDifficulty('hell')}
            />
          </ButtonRow>
        </SettingRow>

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

