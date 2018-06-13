import GameElement from './GameElement';

class Target extends GameElement {
  constructor(squareSize) {
    super(squareSize);
    const coordinates = this.generateAvailableCoordinates();
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
