class SafeArea {
  constructor(ctx, gameWidth, gameHeight) {
    this.ctx = ctx;
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    this.color = "rgba(0, 132, 255, 1)";

    this.ctx.fillStyle = "orange";
    this.ctx.fillRect(100, 100, 1200, 60);
  }
}
