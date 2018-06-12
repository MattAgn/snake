import GameElement from './GameElement'

export default class SnakeBrain extends GameElement {
  constructor({squareSize, walls}) {
    super({ squareSize });
    const coordinates = this.generateAvailableCoordinates(walls.coordinatesList);
    this.body = [{...coordinates, id: 0}];
    this.dx = 0;
    this.dy = 0; 
    this.boardHeight = GameElement.NB_ROWS * squareSize;
    this.boardWidth = GameElement.NB_COLUMNS * squareSize;
    this.moves = [];
    this.lastMove = {x:0, y:0}; 
    this.walls = walls;
  }

  moveUp = () => {
    const currentMove = {x: 0, y: -1};
    if (this.lastMove.y !== -currentMove.y) {
      this.moves.push(currentMove);
    } 
  }

  moveDown = () => {
    const currentMove = {x: 0, y: 1};
    if (this.lastMove.y !== -currentMove.y) {
      this.moves.push(currentMove);
    } 
  }

  moveRight = () => { 
    const currentMove = {x: 1, y: 0};
    if (this.lastMove.x !== -currentMove.x) {
      this.moves.push(currentMove);
    } 
  }
  moveLeft = () => { 
    const currentMove = {x: -1, y: 0};
    if (this.lastMove.x !== -currentMove.x) {
      this.moves.push(currentMove);
    } 
  }

  updatePosition = (newSquareSize, walls) => {
    const prevSquareSize = this.squareSize;
    this.dx = this.lastMove.x * newSquareSize;
    this.dy = this.lastMove.y * newSquareSize;
    this.body = this.body.map(bodyPart => ({
      x: bodyPart.x / prevSquareSize * newSquareSize,
      y: bodyPart.y / prevSquareSize * newSquareSize,
      id: bodyPart.id,
    }));
    this.squareSize = newSquareSize;
    this.boardHeight = GameElement.NB_ROWS * newSquareSize;
    this.boardWidth = GameElement.NB_COLUMNS * newSquareSize;
    this.walls = walls;
  }

  handleBorderCase = () => {
    for (let bodyPart of this.body) {
      if (bodyPart.x === - this.squareSize) {
        bodyPart.x = this.boardWidth - this.squareSize;
      } else if (bodyPart.x === this.boardWidth ) {
        bodyPart.x = 0;
      }
      if (bodyPart.y === - this.squareSize) {
        bodyPart.y = this.boardHeight;
      } else if (bodyPart.y === this.boardHeight) {
        bodyPart.y = 0;
      }
    }
  }

  checkDistanceFromHead = (element, distanceLimit) => {
    // we compute from the center of the square
    const distanceX = this.body[0].x + this.squareSize / 2 - element.x;
    const distanceY = this.body[0].y + this.squareSize / 2 - element.y;
    const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    if (distance <= distanceLimit ) {
      return true;
    } 
    return false;
  }

  checkEatenItself = () => {
    const snakeHead = this.body[0];
    for (let i = 2; i < this.body.length; i++) {
      if (snakeHead.x === this.body[i].x && snakeHead.y === this.body[i].y) {
        return true;
      }
    }
    return false;
  }

  checkWallCollision = () => {
    const snakeHead = this.body[0];
    for (let wall of this.walls.coordinatesList) {
      if (snakeHead.x === wall.x && snakeHead.y === wall.y) {
        return true;
      }
    }
    return false
  }

  run = (target) => {
    let move = this.moves.shift();
    if (move) {
      this.lastMove = move;
      this.dx = this.squareSize * move.x;
      this.dy = this.squareSize * move.y;
    } 
    const cellReached = {
      x: this.body[0].x + this.dx,
      y: this.body[0].y + this.dy,
      id: 0,
    };
    const hasReachedTarget = this.checkDistanceFromHead(target, this.squareSize - 1);
    if (!hasReachedTarget) {
      this.body.pop();
      // if target not reached, continues
    };
    this.body.map(bodyPart => bodyPart.id ++);
    this.body = [cellReached].concat(this.body);
    const hasEatenItself = this.checkEatenItself();
    const hasHitWall = this.checkWallCollision();
    const hasLost = (hasHitWall || hasEatenItself );
    this.handleBorderCase();
    return { hasReachedTarget, hasLost };
  }

  
}
