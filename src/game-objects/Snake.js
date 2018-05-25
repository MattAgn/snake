class Snake {
  constructor(x, y, squareSize) {
    this.squareSize = squareSize;
    this.body = [{x: x , y: y, id: 0}];
    this.dx = 0;
    this.dy = 0;
  }

  // eslint-disable-next-line
  moveUp = () => { this.dy = -this.squareSize; this.dx = 0; }
  moveDown = () => { this.dy = this.squareSize; this.dx = 0; }
  moveRight = () => { this.dx = this.squareSize; this.dy = 0; }
  moveLeft = () => { this.dx = -this.squareSize; this.dy = 0; }

  checkDistanceFromHead = (element, distanceLimit) => {
    // we compute from the center of the square
    const distanceX = this.body[0].x + this.squareSize / 2 - element.x;
    const distanceY = this.body[0].y + this.squareSize / 2 - element.y;
    const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    // squareSize = squareSize / 2 + radiusTarget 
    if (distance <= distanceLimit ) {
      return true;
    } 
    return false;
  }

  checkCollision = () => {
    for (let i = 2; i < this.body.length; i++) {
      if (this.checkDistanceFromHead(this.body[i], this.squareSize / 2 + 2)) {
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
    const hasReachedTarget = this.checkDistanceFromHead(target, this.squareSize);
    const hasEatenItself = this.checkCollision();
    if (!hasReachedTarget) {
      this.body.pop();
      // if target not reached, continues
    };
    if (hasEatenItself) {
      this.body = [this.body[0]]
      alert("you lost !");
    } else {
      this.body.map(bodyPart => bodyPart.id ++);
      this.body = [cellReached].concat(this.body);
    }
    return hasReachedTarget;
  }

  
}

export default Snake;
