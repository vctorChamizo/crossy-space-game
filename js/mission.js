class Mission {
  constructor(ctx, gameWidth, gameHeight, image) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image = new Image();
    this.image.src = image;

    this.width = 30;
    this.height = 30;

    this.posMax = this.gameWidth - this.width;
    this.posMin = this.width;

    this.posX = Math.floor(
      Math.random() * (this.posMax - this.posMin) + this.posMin
    );
    this.posY = 5;
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
