class Game {
  constructor() {
    this.canvas = document.getElementById("game-board");
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.player;
    this.goal;

    this.keys = {
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      LEFT: 37
    };

    this.time = 100;
    this.progressBar;

    this.counterStar = 0;
    this.starElement;
    this.imageStar;
  }

  init() {
    this.player = new Player(
      this.ctx,
      this.width,
      this.height,
      "/res/img/spaces_ships_player/Spaceship_05.svg",
      this.keys
    );

    this.goal = new Goal(
      this.ctx,
      this.width,
      this.height,
      "/res/img/star.svg"
    );

    this.progressBar = document.getElementById("progress-bar");
    this.imageStar = "/res/img/star.svg";
    //document.getElementById("score");
  }

  reset() {}

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  drawAll() {
    this.player.draw();
    this.goal.draw();
  }

  moveAll() {
    //console.log("Mueve el juego");
  }

  collisionStar() {
    return (
      this.player.posX + this.player.height / 2 >= this.goal.posX &&
      this.player.posX + this.player.height / 2 <=
        this.goal.posX + this.goal.width &&
      this.player.posY <= this.goal.posY
    );
  }

  winStar() {
    document
      .getElementById("star-" + this.counterStar)
      .setAttribute("src", this.imageStar);

    this.counterStar++;

    if (this.counterStar >= 3) this.gameWin();
  }

  updateTime() {
    this.time -= 3.3;
    this.progressBar.style.height = this.time + "%";
    if (this.time <= 0) this.gameOver();
  }

  gameWin() {
    console.log("YOU ARE WIN");
  }

  gameOver() {
    console.log("GAME OVER");
  }
}
