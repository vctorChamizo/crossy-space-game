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
    this.translateX;
    this.translateY;

    this.direction = this.keys.UP;
    this.velocity = 0;
    this.degrees = 0;

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

  move() {
    this.direction === this.keys.UP || this.direction === this.keys.DOWN
      ? (this.posY += this.velocity)
      : (this.posX += this.velocity);

    this.translateX = this.posX + this.width / 2;
    this.translateY = this.posY + this.height / 2;

    this.ctx.translate(this.translateX, this.translateY);
    this.ctx.rotate((Math.PI / 180) * this.degrees);
    this.ctx.translate(-this.translateX, -this.translateY);
  }

  setListeners() {
    document.addEventListener("keydown", e => {
      switch (e.keyCode) {
        case this.keys.UP:
          this.posY > 0 ? (this.velocity = -10) : (this.velocity = 0);

          if (this.direction === this.keys.UP) this.degrees = 0;
          else if (this.direction === this.keys.DOWN) this.degrees = 180;
          else if (this.direction === this.keys.LEFT) this.degrees = -90;
          else this.degrees = 90;

          this.direction = this.keys.UP;

          break;

        case this.keys.DOWN:
          this.posY < this.gameHeight - this.height * 0.85
            ? (this.velocity = 10)
            : (this.velocity = 0);

          if (this.direction === this.keys.UP) this.degrees = 180;
          else if (this.direction === this.keys.DOWN) this.degrees = 0;
          else if (this.direction === this.keys.LEFT) this.degrees = -90;
          else this.degrees = 90;

          this.direction = this.keys.DOWN;

          break;

        case this.keys.RIGHT:
          this.posX < this.gameWidth - this.height * 0.85
            ? (this.velocity = 10)
            : (this.velocity = 0);

          this.direction = this.keys.RIGHT;
          break;

        case this.keys.LEFT:
          this.posX > 0 ? (this.velocity = -10) : (this.velocity = 0);

          this.direction = this.keys.LEFT;
          break;
      }
    });

    document.addEventListener("keyup", e => {
      this.velocity = 0;
      this.degrees = 0;
    });
  }
}
