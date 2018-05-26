class Snake {
  constructor(x, y, squareSize, boardHeight, boardWidth) {
    this.squareSize = squareSize;
    this.body = [{x: x , y: y, id: 0}];
    this.dx = squareSize;
    this.dy = 0;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth; 
  }

  // eslint-disable-next-line
  moveUp = () => { this.dy = -this.squareSize; this.dx = 0; }
  moveDown = () => { this.dy = this.squareSize; this.dx = 0; }
  moveRight = () => { this.dx = this.squareSize; this.dy = 0; }
  moveLeft = () => { this.dx = -this.squareSize; this.dy = 0; }

  updatePositionOnResize = (prevElementSize, newElementSize, boardHeight, boardWidth) => {
    this.squareSize = newElementSize;
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.body = this.body.map(bodyPart => ({
      x: bodyPart.x / prevElementSize * newElementSize,
      y: bodyPart.y / prevElementSize * newElementSize,
      id: bodyPart.id,
    }))
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

  checkCollision = () => {
    const snakeHead = this.body[0];
    for (let i = 2; i < this.body.length; i++) {
      if (snakeHead.x === this.body[i].x || snakeHead.y === this.body[i].y) {
        console.log("eaten", i);
        return true;
      }
    }
    return false;
  }

  run = target => {
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
    const hasEatenItself = this.checkCollision();
    if (hasEatenItself) {
      this.body = [this.body[0]]
      alert("you lost !");
    }
    this.handleBorderCase();
    return hasReachedTarget;
  }

  
}

export default Snake;
