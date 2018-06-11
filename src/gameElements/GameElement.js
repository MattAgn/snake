export default class GameElement {
  constructor({squareSize}) {
    this.squareSize = squareSize;
  }

  static get NB_ROWS() {return 16}
  static get NB_COLUMNS() {return 32}

  generateAvailableCoordinates = unavailableSquares => {
    let coordinates = {
      y: this.getRandomYPosition(), 
      x: this.getRandomXPosition(),
    };
    unavailableSquares.forEach(element => {
      if (element.x === coordinates.x && element.y === coordinates.y) {
        coordinates = this.generateAvailableCoordinates(unavailableSquares);
      } 
    })
    return coordinates;  
  }

  getRandomXPosition = x => 
    Math.floor(Math.random() * GameElement.NB_COLUMNS) * this.squareSize;

  getRandomYPosition = y => 
    Math.floor(Math.random() * GameElement.NB_ROWS) * this.squareSize;
}
