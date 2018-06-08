import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './components/Header/Header';
import Canvas from './components/Canvas/Canvas';
import Game from './Game';
import { primaryColor } from './utilities/styling';

const muiTheme = getMuiTheme({
  palette: {
    textColor: primaryColor,
    primary1Color: primaryColor,
  },
});

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Fragment>
      <Game>
        {({ score, highScore, ...canvasProps }) => (
          <Fragment>
            <Header score={score} highScore={highScore} />
            <Canvas {...canvasProps} />
          </Fragment>
        )}
      </Game>
    </Fragment>
  </MuiThemeProvider>
);

export default App;
