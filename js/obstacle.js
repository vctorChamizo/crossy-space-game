class Obstacle {
  constructor(ctx, gameWidth, gameHeight, type) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.type = type;

    this.width = 40;
    this.height = 40;

    this.posX0 = this.gameWidth;
    this.posY0 = 300;
    this.posX = this.posX0;
    this.posY = this.posY0;

    this.vx = 5;
  }

  draw() {
    this.ctx.fillStyle = "white";
    this.ctx.fillRect(this.posX, this.posY, this.width, this.width);
  }

  move() {
    this.posX -= this.vx;
  }
}
