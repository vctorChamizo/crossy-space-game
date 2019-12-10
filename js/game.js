class Game {
  constructor() {
    this.canvas = document.getElementById("gameboard");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.board;
    this.player;
  }

  init() {}

  reset() {}

  clearAll() {}

  drawAll() {}

  moveAll() {}

  gameOver() {}
}
