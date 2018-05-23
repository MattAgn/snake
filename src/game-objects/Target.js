class Target {
  constructor(context, x, y, radius, color = "red") {
    this.x = x;
    this.y = y;
    this.context = context;
    this.radius = radius;
    this.color = color;
  }

  draw = () => {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = this.color;
    this.context.fill();
    this.context.closePath();
  }
}

export default Target;