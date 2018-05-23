class Snake {
  constructor(x, y, squareSize) {
    this.x = x;
    this.y = y;
    this.squareSize = squareSize;
    this.score = 0;
  }

  // eslint-disable-next-line
  moveUp = () => { this.y -= this.squareSize; }
  moveDown = () => { this.y += this.squareSize; }
  moveRight = () => { this.x += this.squareSize; }
  moveLeft = () => { this.x -= this.squareSize; }

  hasReachedTarget = (target) => {
    const distanceX = this.x - target.x;
    const distanceY = this.y - target.y;
    const distance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    if (distance <= this.squareSize + target.radius) {
      this.score += 1;
      return true;
    } 
    return false;
  }
}

export default Snake;
