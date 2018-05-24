class Snake {
  constructor(x, y, squareSize) {
    this.squareSize = squareSize;
    this.body = [{x: x , y: y, id: 0}];
    this.dx = 0;
    this.dy = 0;
    this.lastId = 0;
  }

  // eslint-disable-next-line
  moveUp = () => { this.dy = -this.squareSize; this.dx = 0; }
  moveDown = () => { this.dy = this.squareSize; this.dx = 0; }
  moveRight = () => { this.dx = this.squareSize; this.dy = 0; }
  moveLeft = () => { this.dx = -this.squareSize; this.dy = 0; }

  checkReachTarget = target => {
    // we compute from the center of the square
    const distanceX = this.body[0].x + this.squareSize / 2 - target.x;
    const distanceY = this.body[0].y + this.squareSize / 2 - target.y;
    const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    if (distance <= this.squareSize / 2 + target.radius) {
      return true;
    } 
    return false;
  }

  run = target => {
    const cellReached = {
      x: this.body[0].x + this.dx,
      y: this.body[0].y + this.dy,
      id: this.lastId ++,
    };
    const hasReachedTarget = this.checkReachTarget(target);
    if (!hasReachedTarget) {
      this.body.pop();
      // if target not reached, continues
    };
    this.body = [cellReached].concat(this.body);
    return hasReachedTarget;
  }

  
}

export default Snake;
