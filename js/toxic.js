class Toxic {
  constructor(ctx, gameWidth, gameHeight, image) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image = new Image();
    this.image.src = image;

    this.width = 30;
    this.height = 30;

    this.maxX = this.gameWidth - 100;
    this.minX = 100;
    this.maxY = this.gameHeight - 100;
    this.minY = 100;

    this.posX = Math.floor(Math.random() * (this.maxX - this.minX) + this.minX);
    this.posY = Math.floor(Math.random() * (this.maxY - this.minY) + this.minY);
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
}
