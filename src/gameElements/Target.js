import GameClass from './GameClass';

class Target extends GameClass {
  constructor({ squareSize, walls, snake }) {
    super({ squareSize });
    const unavailableSquares = walls.coordinatesList.concat(snake.body);
    const coordinates = this.generateAvailableCoordinates(unavailableSquares);
    this.x = coordinates.x + squareSize / 2;
    this.y = coordinates.y + squareSize / 2;
  }

  updatePosition = newSquareSize => {
    const prevSquareSize = this.squareSize;
    this.x = this.x / prevSquareSize * newSquareSize;
    this.y = this.y / prevSquareSize * newSquareSize;
    this.squareSize = newSquareSize;
  }
}

export default Target;
