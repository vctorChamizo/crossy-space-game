class Obstacle {
  constructor(ctx, gameWidth, gameHeight, typeObstacle) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.height = 30;

    this.min = 0;
    this.max = 7;
    this.type = Math.floor(Math.random() * (this.max - this.min)) + this.min;

    this.image = new Image();

    this.obstacle = obstacles[this.type];

    if (this.obstacle.direction === "left") {
      this.posX = this.gameWidth;
      this.vx = -2.5;
    } else {
      this.posX = 0;
      this.vx = 2.5;
    }

    this.posY = this.obstacle.posY;
    this.image.src = this.obstacle.image;
    this.width = this.obstacle.width;
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  move() {
    this.posX += this.vx;
  }
}
