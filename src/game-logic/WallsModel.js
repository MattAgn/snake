import GameElement from './GameElementModel';

class WallsModel extends GameElement {
  constructor(squareSize, settings) {
    super(squareSize);
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
          type: 'wall'
        };
        coordinatesList.push(wall);
      }
    } else if (mode === 'level') {
      coordinatesList = levelsCoordinatesList[difficulty].map(
        (wall, index) => ({
          id: index,
          x: wall.x * squareSize,
          y: wall.y * squareSize,
          type: 'wall'
        })
      );
    }
    const unavailableSquares = [].concat(coordinatesList);
    this.coordinatesList = coordinatesList;
    GameElement.unavailableSquares = unavailableSquares;
  }

  updatePosition = newSquareSize => {
    let coordinatesList = this.coordinatesList;
    const prevSquareSize = this.squareSize;
    coordinatesList = coordinatesList.map(wall => ({
      id: wall.id,
      x: (wall.x / prevSquareSize) * newSquareSize,
      y: (wall.y / prevSquareSize) * newSquareSize
    }));
    this.squareSize = newSquareSize;
    this.coordinatesList = coordinatesList;
  };
}

const levelsCoordinatesList = {
  1: [
    { y: 8, x: 9 },
    { y: 9, x: 9 },
    { y: 10, x: 9 },
    { y: 11, x: 9 },
    { y: 3, x: 9 },
    { y: 5, x: 9 },
    { y: 6, x: 9 },
    { y: 7, x: 9 },
    { y: 4, x: 9 },
    { y: 8, x: 22 },
    { y: 9, x: 22 },
    { y: 10, x: 22 },
    { y: 11, x: 22 },
    { y: 3, x: 22 },
    { y: 5, x: 22 },
    { y: 6, x: 22 },
    { y: 7, x: 22 },
    { y: 4, x: 22 }
  ],
  2: [
    { x: 10, y: 3 },
    { x: 11, y: 3 },
    { x: 10, y: 4 },
    { x: 11, y: 4 },
    { x: 21, y: 3 },
    { x: 22, y: 3 },
    { x: 21, y: 4 },
    { x: 22, y: 4 },
    { x: 10, y: 10 },
    { x: 11, y: 10 },
    { x: 10, y: 11 },
    { x: 11, y: 11 },
    { x: 21, y: 10 },
    { x: 22, y: 10 },
    { x: 21, y: 11 },
    { x: 22, y: 11 },
    { x: 16, y: 7 }
  ],
  3: [
    { y: 8, x: 9 },
    { y: 9, x: 9 },
    { y: 10, x: 9 },
    { y: 11, x: 9 },
    { y: 3, x: 9 },
    { y: 5, x: 9 },
    { y: 6, x: 9 },
    { y: 7, x: 9 },
    { y: 4, x: 9 },
    { y: 8, x: 22 },
    { y: 9, x: 22 },
    { y: 10, x: 22 },
    { y: 11, x: 22 },
    { y: 3, x: 22 },
    { y: 5, x: 22 },
    { y: 6, x: 22 },
    { y: 7, x: 22 },
    { y: 4, x: 22 },
    { y: 3, x: 10 },
    { y: 3, x: 11 },
    { y: 3, x: 12 },
    { y: 3, x: 13 },
    { y: 3, x: 14 },
    { y: 3, x: 15 },
    { y: 3, x: 16 },
    { y: 3, x: 17 },
    { y: 3, x: 18 },
    { y: 3, x: 19 },
    { y: 3, x: 20 },
    { y: 3, x: 21 },
    { y: 11, x: 10 },
    { y: 11, x: 11 },
    { y: 11, x: 21 },
    { y: 11, x: 20 }
  ],
  4: [
    { y: 8, x: 9 },
    { y: 9, x: 9 },
    { y: 10, x: 9 },
    { y: 11, x: 9 },
    { y: 3, x: 9 },
    { y: 5, x: 9 },
    { y: 6, x: 9 },
    { y: 7, x: 9 },
    { y: 4, x: 9 },
    { y: 8, x: 22 },
    { y: 9, x: 22 },
    { y: 10, x: 22 },
    { y: 11, x: 22 },
    { y: 3, x: 22 },
    { y: 5, x: 22 },
    { y: 6, x: 22 },
    { y: 7, x: 22 },
    { y: 4, x: 22 },
    { y: 3, x: 10 },
    { y: 3, x: 11 },
    { y: 3, x: 12 },
    { y: 3, x: 13 },
    { y: 3, x: 18 },
    { y: 3, x: 19 },
    { y: 3, x: 20 },
    { y: 3, x: 21 },
    { y: 11, x: 10 },
    { y: 11, x: 11 },
    { y: 11, x: 12 },
    { y: 11, x: 13 },
    { y: 11, x: 21 },
    { y: 11, x: 20 },
    { y: 11, x: 19 },
    { y: 11, x: 18 }
  ],
  5: [
    { y: 11, x: 14 },
    { y: 11, x: 16 },
    { y: 11, x: 15 },
    { y: 10, x: 13 },
    { y: 10, x: 17 },
    { y: 9, x: 12 },
    { y: 9, x: 18 },
    { y: 8, x: 11 },
    { y: 8, x: 19 },
    { y: 7, x: 20 },
    { y: 7, x: 10 },
    { y: 6, x: 9 },
    { y: 6, x: 21 },
    { y: 5, x: 22 },
    { y: 5, x: 8 },
    { y: 4, x: 5 },
    { y: 4, x: 6 },
    { y: 4, x: 7 },
    { y: 4, x: 25 },
    { y: 4, x: 24 },
    { y: 4, x: 23 }
  ],
  6: [
    { y: 14, x: 8 },
    { y: 13, x: 8 },
    { y: 12, x: 8 },
    { y: 11, x: 8 },
    { y: 11, x: 10 },
    { y: 11, x: 11 },
    { y: 11, x: 12 },
    { y: 11, x: 13 },
    { y: 11, x: 14 },
    { y: 11, x: 15 },
    { y: 11, x: 9 },
    { y: 11, x: 16 },
    { y: 11, x: 17 },
    { y: 11, x: 18 },
    { y: 11, x: 19 },
    { y: 11, x: 20 },
    { y: 11, x: 21 },
    { y: 11, x: 22 },
    { y: 12, x: 22 },
    { y: 13, x: 22 },
    { y: 14, x: 22 },
    { y: 7, x: 15 },
    { y: 8, x: 15 },
    { y: 5, x: 12 },
    { y: 5, x: 11 },
    { y: 5, x: 18 },
    { y: 5, x: 19 },
    { y: 4, x: 12 },
    { y: 4, x: 11 },
    { y: 4, x: 18 },
    { y: 4, x: 19 },
    { y: 2, x: 11 },
    { y: 2, x: 10 },
    { y: 2, x: 13 },
    { y: 2, x: 12 },
    { y: 2, x: 9 },
    { y: 2, x: 17 },
    { y: 2, x: 18 },
    { y: 2, x: 19 },
    { y: 2, x: 20 },
    { y: 2, x: 21 }
  ]
};

export default WallsModel;
