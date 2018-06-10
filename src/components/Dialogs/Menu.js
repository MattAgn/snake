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
  },
  labelPlayButton: {
    fontWeight: '400',
  },
};


export default class Menu extends Component {
  static getDerivedStateFromProps(props) {
    const buttonsBgColor = new Array(3).fill('#FFF');
    buttonsBgColor[props.difficulty] = `${primaryColor}`;
    return ({ buttonsBgColor });
  }

  render() {
    const { onClickSettings, onClickDifficulty } = this.props;
    const { buttonsBgColor } = this.state;
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
              id="0"
              label="Easy"
              style={styles.buttons}
              backgroundColor={buttonsBgColor[0]}
              onClick={onClickDifficulty(0)}
            />
            <RaisedButton
              id="1"
              label="Medium"
              backgroundColor={buttonsBgColor[1]}
              style={styles.buttons}
              onClick={onClickDifficulty(1)}
            />
            <RaisedButton
              id="2"
              label="Hell"
              backgroundColor={buttonsBgColor[2]}
              style={styles.buttons}
              onClick={onClickDifficulty(2)}
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

