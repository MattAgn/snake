import GameElement from './GameElement';

class Walls extends GameElement {
  constructor({ squareSize, settings }) {
    super({ squareSize });
    this.wallsPerDifficulty = [0, 7, 15];
    const coordinatesList = [];
    if (settings.mode === 'classic') {
      const nbWalls = this.wallsPerDifficulty[settings.difficulty];
      for (let i = 0; i < nbWalls; i++) {
        const wall = {
          x: this.getRandomXPosition(),
          y: this.getRandomYPosition(),
          id: i,
        };
        coordinatesList.push(wall);
      }
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


export default Walls;
