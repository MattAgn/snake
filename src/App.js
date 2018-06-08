import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './components/Header/Header';
import Canvas from './components/Canvas/Canvas';
import Game from './Game';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
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
  }
}

export default App;
