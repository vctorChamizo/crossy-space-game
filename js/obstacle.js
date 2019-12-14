class Obstacle {
  constructor(ctx, gameWidth, gameHeight, typeObstacle) {
    this.ctx = ctx;

    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.width = 30;
    this.height = 30;

    this.typeObstacle = typeObstacle;

    this.min = 1;
    this.max = 5;
    this.type = Math.floor(Math.random() * (this.max - this.min)) + this.min;

    this.vx = 2.5;

    this.image = new Image();

    switch (this.type) {
      case this.typeObstacle.PLANET:
        this.posX0 = this.gameWidth;
        this.posY0 = 50;
        this.vx = -this.vx;
        this.image.src = "/res/img/saturn.svg";
        break;

      case this.typeObstacle.MARTIAN:
        this.posX0 = 0;
        this.posY0 = 170;
        this.image.src = "/res/img/ufo.svg";
        break;

      case this.typeObstacle.METEORITE:
        this.posX0 = this.gameWidth;
        this.posY0 = 300;
        this.vx = -this.vx;
        this.image.src = "/res/img/asteroid.svg";
        break;

      case this.typeObstacle.SATELLITE:
        this.posX0 = 0;
        this.posY0 = 400;
        this.image.src = "/res/img/satellite.svg";
        break;
    }

    this.posX = this.posX0;
    this.posY = this.posY0;
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
