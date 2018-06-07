import React, { Component } from 'react';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import RetryIcon from "material-ui/svg-icons/av/replay";

const styles = {
  settingName: {
    margin: '5vh 0px 0px 0px', 
    color:'black', 
    fontWeight: '400', 
    marginRight: '3%',
    display: 'inline-block'
  },
  settingRow: {
    display: 'flex',
    alignItems: 'baseline',
  },
  icon: {
    width: 30,
    height: 30,
  },
  button: {
    height: '70',
    width: '70',
    padding: '16',
    marginLeft: '10',
  },
}

class MySettings extends Component {
  // eslint-disable-next-line 
  state = {
    open: true,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSave = () => {
    this.props.handleSave();
    this.handleClose();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleSave}
      />,
    ];

    return (
      <React.Fragment>
        <IconButton
        disableKeyboardFocus 
        tooltip="Settings" 
        onClick={this.handleOpen} 
        style={styles.buttonStyle}
        iconStyle={styles.iconStyle}>
          <Settings color="#E0E0E0"/>
        </IconButton>
        <Dialog
          title="Settings"
          actions={actions}
          modal={true}
          open={this.state.open}
          style={{color:'black'}}>
          {/* //TODO: add score and congrats if high score */}
        <IconButton>
          <SettingsIcon/>
        </IconButton>
        <IconButton>
          <RetryIcon/>
        </IconButton>
        </Dialog>
      </React.Fragment>
    )
  }
}


export default GameOver;