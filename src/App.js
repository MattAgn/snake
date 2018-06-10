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
  /* margin: 2%; */
  text-align: center;
`;

const App = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <Fragment>
      <Game>
        {({
          score, highScore, difficulty, handlePauseGame, handleClickRetry, handleClickDifficulty, handleClickSettings, isMenuOpened, isGameOver, isGamePaused, ...canvasProps
          }) => (
            <Fragment>
              <Header
                score={score}
                highScore={highScore}
                difficulty={difficulty}
                isMenuOpened={isMenuOpened}
                isGamePaused={isGamePaused}
                onClickPlay={handlePauseGame}
                onClickDifficulty={handleClickDifficulty}
                onClickSettings={handleClickSettings}
              />
              <Canvas {...canvasProps} />
              <Controls>
                Use the arrow keys to move, and press the space bar to pause the game
              </Controls>

              { isGameOver &&
                <GameOver
                  score={score}
                  highScore={highScore}
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
