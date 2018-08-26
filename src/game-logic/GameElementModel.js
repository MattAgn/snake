class GameElementModel {
  constructor(squareSize) {
    this.squareSize = squareSize;
  }

  static get NB_ROWS() {
    return 15;
  }
  static get NB_COLUMNS() {
    return 30;
  }

  // static get unavailableSquares() {return GameElementModel.unavailableSquares}
  // static set unavailableSquares(unavailableSquares) {console.log(unavailableSquares)}

  generateAvailableCoordinates = type => {
    const unavailableSquares = GameElementModel.unavailableSquares;
    // console.log("unavailable", unavailableSquares)
    let coordinates = {
      y: this.getRandomYPosition(),
      x: this.getRandomXPosition(),
      type
    };
    unavailableSquares.forEach(element => {
      if (element.x === coordinates.x && element.y === coordinates.y) {
        coordinates = this.generateAvailableCoordinates(type);
      }
    });
    unavailableSquares.push(coordinates);
    GameElementModel.unavailableSquares = unavailableSquares;
    return coordinates;
  };

  freeCoordinates = ({ x, y }, type = 'snake') => {
    let unavailableSquares = GameElementModel.unavailableSquares;
    unavailableSquares = unavailableSquares.filter(
      el => el.x !== x || el.y !== y
    );
    // if (type === "target") console.log("freed coordinates")
    GameElementModel.unavailableSquares = unavailableSquares;
  };

  getRandomXPosition = x =>
    Math.floor(Math.random() * GameElementModel.NB_COLUMNS) * this.squareSize;

  getRandomYPosition = y =>
    Math.floor(Math.random() * GameElementModel.NB_ROWS) * this.squareSize;
}

export default GameElementModel;
