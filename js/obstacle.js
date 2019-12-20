class Obstacle {
  constructor(ctx, gameWidth, gameHeight, keysDirection) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.keysDirection = keysDirection;

    this.height = 30;
    this.width = 30;

    this.obstacles_data = obstacles_data;

    this.obstacle = this.obstacles_data[
      Math.floor(Math.random() * this.obstacles_data.length)
    ];

    this.posY = this.obstacle.posY;
    this.posX = 0;

    this.vx = this.obstacle.vx;

    if (this.obstacle.direction === this.keysDirection.LEFT) this.posX = this.gameWidth;

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
    this.obstacle.direction === this.keysDirection.LEFT
      ? (this.posX -= this.vx)
      : (this.posX += this.vx);
  }

  isCollision(player) {
    return (
      player.posX + player.width > this.posX &&
      player.posX < this.posX + this.width &&
      player.posY + player.height > this.posY &&
      player.posY < this.posY + this.height
    );
  }

  isOutOfRange() {
    return this.posX >= -this.width && this.posX <= this.gameWidth;
  }
}
