class Player {
  constructor(ctx, gameWidth, gameHeight, image, keys) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.image = new Image();
    this.image.src = image;

    this.keys = keys;

    this.width = 80;
    this.height = 80;

    this.posX0 = this.gameWidth / 2 - this.width / 2;
    this.posY0 = this.gameHeight - this.height * 0.85;
    this.posX = this.posX0;
    this.posY = this.posY0;

    this.direction = this.keys.UP;
    this.velocity = 8;

    this.setListeners();
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

  move() {}

  setListeners() {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.keys.UP:
          if (this.posY > 0) this.posY -= this.velocity;
          break;

        case this.keys.DOWN:
          if (this.posY < this.gameHeight - this.height * 0.85) {
            this.posY += this.velocity;
          }

          break;

        case this.keys.RIGHT:
          if (this.posX < this.gameWidth - this.height * 0.85)
            this.posX += this.velocity;
          break;

        case this.keys.LEFT:
          if (this.posX > 0) this.posX -= this.velocity;
          break;
      }
    });

    document.addEventListener("keyup", e => {
      switch (e) {
        case this.keys.UP:
          break;

        case this.keys.DOWN:
          break;

        case this.keys.RIGHT:
          break;

        case this.keys.LEFT:
          break;
      }
    });
  }
}
