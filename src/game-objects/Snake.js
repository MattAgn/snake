class Snake {
  constructor(x, y, squareSize) {
    this.squareSize = squareSize;
    this.body = [{x: x, y: y, id: 0}];
    this.dx = squareSize;
    this.dy = 0;
    this.lastId = 0;
  }

  // eslint-disable-next-line
  moveUp = () => { this.dy = -this.squareSize; this.dx = 0; }
  moveDown = () => { this.dy = this.squareSize; this.dx = 0; }
  moveRight = () => { this.dx = this.squareSize; this.dy = 0; }
  moveLeft = () => { this.dx = -this.squareSize; this.dy = 0; }

  hasReachedTarget = (target) => {
    const distanceX = this.body[0].x - target.x;
    const distanceY = this.body[0].y - target.y;
    const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    if (distance <= this.squareSize * Math.sqrt(2) + target.radius) {
      return true;
    } 
    return false;
  }
}

export default Snake;
