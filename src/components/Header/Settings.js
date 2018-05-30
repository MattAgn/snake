import React, { Component } from 'react';
import Settings from 'material-ui/svg-icons/action/settings';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import TextField from 'material-ui/TextField';

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

class Settings extends Component {
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
          style={{color:'black'}}
          >
          <div style={styles.settingRow}>
            <h4 style={styles.settingName}>Player mode </h4>
            <RaisedButton>1 Player</RaisedButton>
            <RaisedButton disabled>2 Players</RaisedButton>
          </div>
          <div style={styles.settingRow}>
            <h4 style={styles.settingName}>Difficulty </h4>
            <RaisedButton>Easy</RaisedButton>
            <RaisedButton>Medium</RaisedButton>
            <RaisedButton>Hard</RaisedButton>
          </div>    
        </Dialog>
      </React.Fragment>
    )
  }
}


export default Settings;