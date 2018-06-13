export default class GameElement {
  constructor(squareSize) {
    this.squareSize = squareSize;
  }

  static get NB_ROWS() {return 15}
  static get NB_COLUMNS() {return 30}
  
  // static get unavailableSquares() {return GameElement.unavailableSquares}
  // static set unavailableSquares(unavailableSquares) {}

  generateAvailableCoordinates = () => {
    const unavailableSquares = GameElement.unavailableSquares;
    let coordinates = {
      y: this.getRandomYPosition(), 
      x: this.getRandomXPosition(),
    };
    unavailableSquares.forEach(element => {
      if (element.x === coordinates.x && element.y === coordinates.y) {
        coordinates = this.generateAvailableCoordinates(unavailableSquares);
      } 
    })
    unavailableSquares.push(coordinates);
    GameElement.unavailableSquares = unavailableSquares;
    return coordinates;  
  }

  freeCoordinates = ({x, y}) => {
    let unavailableSquares = GameElement.unavailableSquares;
    unavailableSquares = unavailableSquares.filter(el => (
      el.x !== x && el.y !== y
    ))
    GameElement.unavailableSquares = unavailableSquares;
  }

  getRandomXPosition = x => 
    Math.floor(Math.random() * GameElement.NB_COLUMNS) * this.squareSize;

  getRandomYPosition = y => 
    Math.floor(Math.random() * GameElement.NB_ROWS) * this.squareSize;
}

GameElement.unavailableSquares = [];