class Game {
  constructor() {
    this.optionMenu;
    this.canvas;
    this.ctx;
    this.width;
    this.height;

    this.player;
    this.keys = {
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      LEFT: 37
    };

    this.goal;

    this.infoPlayerElement;
    this.livesElement;
    this.progressBarElement;
    this.time = 100;
    this.counterLives = 3;

    this.infoGoalsElement;
    this.imageStar;
    this.counterStar = 0;

    this.level = 1;
    this.subLevel = 0;

    this.status = undefined;
    this.statusKey = {
      WINNER: "Winner",
      LOSER: "Loser"
    };
  }

  start() {
    document.getElementById("option-board").style.display = "none";

    this.canvas = document.getElementById("game-board");
    this.canvas.style.display = "block";

    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.infoPlayerElement = document.getElementById("info-player-container");
    this.infoPlayerElement.style.visibility = "visible";

    this.infoGoalsElement = document.getElementById("info-goals-container");
    this.infoGoalsElement.style.visibility = "visible";

    this.setPlayerOnBoard();
    this.setGoalOnBoard();

    this.livesElement = document.getElementById("lives-player");
    this.progressBarElement = document.getElementById("progress-bar");
    this.imageStar = "/res/img/star.svg";
  }

  setPlayerOnBoard() {
    this.player = new Player(
      this.ctx,
      this.width,
      this.height,
      "/res/img/spaces_ships_player/Spaceship_05.svg",
      this.keys
    );
  }

  setGoalOnBoard() {
    this.goal = new Goal(
      this.ctx,
      this.width,
      this.height,
      "/res/img/star.svg"
    );
  }

  reset() {
    this.time = 100;
    this.progressBarElement.style.height = this.time + "%";

    this.setPlayerOnBoard();
    this.setGoalOnBoard();
  }

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
    let starElement = document.getElementById("star-" + this.counterStar);

    if (starElement) {
      starElement.setAttribute("src", this.imageStar);
      this.counterStar++;
    }

    this.counterStar >= 3
      ? (this.status = this.statusKey.WINNER)
      : this.reset();
  }

  updateTime() {
    if (this.time <= 0 && this.counterLives > 0) {
      this.counterLives--;
      this.livesElement.textContent--;

      if (this.counterLives === 0) this.status = this.statusKey.LOSER;
    }

    this.time -= 3.3;
    this.progressBarElement.style.height = this.time + "%";
  }

  gameStatus() {
    this.status === this.statusKey.WINNER
      ? this.playerWinner()
      : this.status === this.statusKey.WINNER
      ? this.playerGameOver()
      : null;
  }

  playerWinner() {
    console.log("YOU ARE WINNER");
    // Añadir mensaje ganador en caso de acabar el juego
    // Cuando haya implementados mas niveles -> continuar al siguiente nivel.
  }

  playerGameOver() {
    console.log("YOU ARE A LOSER");
    // Añadir mensaje de perdedor y dar opcion a reiniciar el juego.
  }
}
