class GameElement {
  constructor({ squareSize }) {
    this.squareSize = squareSize;
  }

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
    Math.floor(Math.random() * this.nbColumns) * this.squareSize;

  getRandomYPosition = y => 
    Math.floor(Math.random() * this.nbRows) * this.squareSize;
}

GameElement.nbRows = 32;
GameElement.nbColumns = 16;