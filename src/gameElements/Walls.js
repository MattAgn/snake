import GameElement from './GameElement';

class Walls extends GameElement {
  constructor({ squareSize, settings }) {
    super({ squareSize });
    this.wallsPerDifficulty = [0, 7, 15];
    let coordinatesList = [];
    const { difficulty, mode } = settings;
    if (mode === 'classic') {
      const nbWalls = this.wallsPerDifficulty[difficulty];
      for (let i = 0; i < nbWalls; i++) {
        const wall = {
          x: this.getRandomXPosition(),
          y: this.getRandomYPosition(),
          id: i,
        };
        coordinatesList.push(wall);
      }
    } else if (mode === 'levels') {
      coordinatesList = levelsCoordinatesList[difficulty].map((wall, index) => ({
        id: index,
        x: wall.x * squareSize,
        y: wall.y * squareSize
      }));
    }
    this.coordinatesList = coordinatesList;
  }

  updatePosition = newSquareSize => {
    let coordinatesList = this.coordinatesList;
    const prevSquareSize = this.squareSize;
    coordinatesList = coordinatesList.map(wall => ({
      id: wall.id,
      x: wall.x / prevSquareSize * newSquareSize,
      y: wall.y / prevSquareSize * newSquareSize,
    }));
    this.squareSize = newSquareSize;
    this.coordinatesList = coordinatesList;
  }
}


const levelsCoordinatesList = {
  1: [ {y: 8, x: 9}, {y: 9, x: 9}, {y: 10, x: 9}, {y: 11, x: 9},
      {y: 12, x: 9}, {y: 5, x: 9}, {y: 6, x: 9}, {y: 7, x: 9}, {y: 4, x: 9},
      {y: 8, x: 22}, {y: 9, x: 22}, {y: 10, x: 22}, {y: 11, x: 22},
      {y: 12, x: 22}, {y: 5, x: 22}, {y: 6, x: 22}, {y: 7, x: 22}, {y: 4, x: 22}]  
}





export default Walls;
