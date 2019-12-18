class Obstacle {
  constructor(ctx, gameWidth, gameHeight, typeObstacle) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.height = 30;
    this.width = 30;

    this.obstacles_data = obstacles_data;

    this.obstacle = this.obstacles_data[
      Math.floor(Math.random() * this.obstacles_data.length)
    ];

    this.posY = this.obstacle.posY;
    this.posX = 0;

    this.vx = 2.5;

    if (this.obstacle.direction === "left") {
      this.posX = this.gameWidth;
      this.vx = -2.5;
    }

    this.image = new Image();
    this.image.src = this.obstacle.image;
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
