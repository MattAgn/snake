import React, { Fragment } from 'react';
import styled from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import { primaryColor } from './utilities/styling';

import GameProvider from './GameProvider';
import Header from './components/header/Header';
import Canvas from './components/canvas/Canvas';
import Menu from './components/menu/Menu';
import GameOver from './components/game-over/GameOver';

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Fragment>
      <GameProvider>
        <Container>
          <Header />

          <Canvas />

          <Controls>
            Use the arrow keys to move, and press the space bar to pause the
            game
          </Controls>

          <Menu />
          <GameOver />
        </Container>
      </GameProvider>
    </Fragment>
  </MuiThemeProvider>
);

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

export default App;
