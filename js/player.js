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
    // Velocity
    if (this.direction === this.keys.UP && this.posY > 0)
      this.posY += this.velocity;
    else if (
      this.direction === this.keys.DOWN &&
      this.posY + this.height < this.gameHeight
    )
      this.posY += this.velocity;
    else if (
      this.direction === this.keys.RIGHT &&
      this.posX + this.width < this.gameWidth
    )
      this.posX += this.velocity;
    else if (this.direction === this.keys.LEFT && this.posX > 0)
      this.posX += this.velocity;

    // Rotation
    if (this.direction === this.keys.UP) this.degrees = 0;
    else if (this.direction === this.keys.DOWN) this.degrees = 180;
    else if (this.direction === this.keys.LEFT) this.degrees = 270;
    else this.degrees = 90;

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
          this.velocity = -10;
          this.direction = this.keys.UP;
          break;

        case this.keys.DOWN:
          this.velocity = 10;
          this.direction = this.keys.DOWN;

          break;

        case this.keys.RIGHT:
          this.velocity = 10;
          this.direction = this.keys.RIGHT;
          break;

        case this.keys.LEFT:
          this.velocity = -10;
          this.direction = this.keys.LEFT;
          break;

        default:
          this.velocity = 0;
          break;
      }
    });

    document.addEventListener("keyup", e => {
      this.velocity = 0;
    });
  }
}
