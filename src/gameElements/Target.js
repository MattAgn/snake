import GameElement from './GameElement';

class Target extends GameElement {
  constructor(squareSize) {
    super(squareSize);
    const coordinates = this.generateAvailableCoordinates("target");
    this.x = coordinates.x + Math.floor(squareSize / 2);
    this.y = coordinates.y + Math.floor(squareSize / 2);
    this.id = Math.floor(this.x * 100 * this.y * Math.random())
    console.log("coordTarget", {x: this.x, y: this.y});
  }

  updatePosition = newSquareSize => {
    const prevSquareSize = this.squareSize;
    this.x = this.x / prevSquareSize * newSquareSize;
    this.y = this.y / prevSquareSize * newSquareSize;
    this.squareSize = newSquareSize;
  }
}

export default Target;
