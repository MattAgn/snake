import React, { Fragment } from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Header from './components/Header/Header';
import Canvas from './components/Canvas/Canvas';
import GameOver from './components/Dialogs/GameOver';
import Game from './Game';
import { primaryColor } from './utilities/styling';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: primaryColor,
  },
});

const Controls = styled.h3`
  font-weight: 400;
  color: white;  
  text-align: center;
`;

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Fragment>
      <Game>
        {({
          scores,
          gameElements,
          settings,
          handleClickRetry,
          handleClickSettings,
          isGameOver,
          ...headerProps
          }) => (
            <Fragment>
              <Header
                {...headerProps}
                {...scores}
                settings={settings}
                onClickSettings={handleClickSettings}
              />

              {gameElements && <Canvas {...gameElements} />}

              <Controls>
                Use the arrow keys to move, and press the space bar to pause the game
              </Controls>

              { isGameOver &&
                <GameOver
                  {...scores}
                  onClickSettings={handleClickSettings}
                  onClickRetry={handleClickRetry}
                />
              }
            </Fragment>
        )}
      </Game>
    </Fragment>
  </MuiThemeProvider>
);

export default App;
