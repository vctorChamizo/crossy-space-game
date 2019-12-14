class Game {
  constructor() {
    /* Global Context */
    this.canvas;
    this.ctx;
    this.width;
    this.height;

    /* Option Menu */
    this.optionMenu;
    this.mainTitleOption;
    this.statusTitleOption;
    this.textQuestionOption;

    /* Player */
    this.player;
    this.keys = {
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      LEFT: 37
    };

    /* Mission */
    this.mission;
    this.missionContainer;
    this.missionImage;
    this.counterMission;
    this.missionImageEmpty;

    this.infoPlayerElement;
    this.livesElement;
    this.progressBarElement;
    this.time;
    this.counterLives;

    this.obstacle;
    this.obstacles;
    this.typeObstacle = {};

    this.status;
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

    this.missionContainer = document.getElementById("info-goals-container");
    this.missionContainer.style.visibility = "visible";
    this.starElement = this.setPlayerOnBoard();
    this.setGoalOnBoard();

    this.livesElement = document.getElementById("lives-player");
    this.progressBarElement = document.getElementById("progress-bar");
    this.missionImage = "/res/img/star.svg";
    this.missionImageEmpty = "/res/img/star-empty.svg";

    this.mainTitleOption = document.getElementById("main-title-option-board");
    this.statusTitleOption = document.getElementById(
      "status-title-option-board"
    );
    this.textQuestionOption = document.getElementById("text-option-board");

    this.init();
  }

  init() {
    this.time = 100;
    this.counterLives = 3;
    this.counterMission = 0;
    this.status = undefined;
    this.obstacles = [];

    this.initStars();
  }

  initStars() {
    let starElement;

    for (let i = 0; i < 3; ++i) {
      starElement = document.getElementById("star-" + i);
      if (starElement) starElement.setAttribute("src", this.missionImageEmpty);
    }
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
    this.mission = new Mission(
      this.ctx,
      this.width,
      this.height,
      "/res/img/star.svg"
    );
  }

  restart() {
    this.time = 100;
    this.progressBarElement.style.height = this.time + "%";

    this.setPlayerOnBoard();
    this.setGoalOnBoard();
  }

  clearAll() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  update() {
    this.mission.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());

    this.ctx.save();
    this.player.move();
    this.player.draw();
    this.ctx.restore();

    this.obstacles.forEach(obstacle => obstacle.move());
  }

  generateObstacles() {
    this.obstacles.push(new Obstacle(this.ctx, this.width, this.height));
  }

  collisionObstacle() {
    return this.obstacles.some(
      obs =>
        this.player.posX + this.player.width > obs.posX &&
        this.player.posX < obs.posX + obs.width &&
        this.player.posY + this.player.height > obs.posY &&
        this.player.posY < obs.posY + obs.height
    );
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obstacle => obstacle.posX >= 0);
  }

  collisionStar() {
    return (
      this.player.posX < this.mission.posX + this.mission.width &&
      this.player.posX + this.player.width >= this.mission.posX &&
      this.player.posY <= this.mission.posY
    );
  }

  winStar() {
    let starElement = document.getElementById("star-" + this.counterMission);

    if (starElement) {
      starElement.setAttribute("src", this.missionImage);
      this.counterMission++;
    }

    this.counterMission >= 3
      ? (this.status = this.statusKey.WINNER)
      : this.restart();
  }

  updateTime() {
    this.time -= 0.1;
    this.progressBarElement.style.height = this.time + "%";

    if (this.time <= 0 && this.counterLives > 0) this.loseLive();
  }

  loseLive() {
    this.counterLives--;
    this.livesElement.textContent--;

    this.counterLives === 0
      ? (this.status = this.statusKey.LOSER)
      : this.restart();
  }

  gameStatus() {
    return this.status === this.statusKey.WINNER ||
      this.status === this.statusKey.LOSER
      ? this.finalScreen()
      : null;
  }

  finalScreen() {
    document.getElementById("option-board").style.display = "flex";
    this.canvas.style.display = "none";
    this.mainTitleOption.style.display = "none";
    this.statusTitleOption.style.display = "block";
    this.textQuestionOption.style.display = "block";

    this.status === this.statusKey.WINNER
      ? (this.statusTitleOption.textContent = "¡WINNER!")
      : (this.statusTitleOption.textContent = "GAME OVER");
  }
}
