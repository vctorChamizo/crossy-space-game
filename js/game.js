class Game {
  constructor() {
    this.canvas = document.getElementById("game-board");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.board;
    this.player;
  }

  init() {}

  reset() {}

  clearAll() {
    //console.log("Limpia el juego");
  }

  drawAll() {
    //console.log("Pinta el juego");
  }

  moveAll() {
    //console.log("Mueve el juego");
  }

  gameOver() {}
}
