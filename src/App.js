import React, { Fragment } from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { primaryColor } from './utilities/styling';

import Header from './components/header/Header';
import Canvas from './components/canvas/Canvas';
import GameOver from './components/game-over/GameOver';
import GameLogic from './GameLogic';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: primaryColor
  }
});

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100vh;
  padding: 3%;
`;

const Controls = styled.h3`
  font-weight: 400;
  color: white;
  text-align: center;
`;

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Fragment>
      <GameLogic>
        {({
          scores,
          gameElements,
          settings,
          handleClickRetry,
          handleClickSettings,
          isGameOver,
          ...headerProps
        }) => (
          <Container>
            <Header
              {...headerProps}
              {...scores}
              settings={settings}
              onClickSettings={handleClickSettings}
            />

            {gameElements && <Canvas {...gameElements} />}

            <Controls>
              Use the arrow keys to move, and press the space bar to pause the
              game
            </Controls>

            {isGameOver && (
              <GameOver
                {...scores}
                onClickSettings={handleClickSettings}
                onClickRetry={handleClickRetry}
              />
            )}
          </Container>
        )}
      </GameLogic>
    </Fragment>
  </MuiThemeProvider>
);

export default App;
