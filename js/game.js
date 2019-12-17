class Game {
  constructor() {
    /* Game Board */
    this.canvas;
    this.ctx;
    this.width;
    this.height;

    /* Option Menu */
    this.optionMenu;
    this.mainTitleOption;
    this.statusTitleOption;
    this.textQuestionOption;
    this.spaceShipChooserOption;

    /* Player */
    this.player;
    this.spaceShipImg;
    this.status;
    this.statusKey = {
      WINNER: "Winner",
      LOSER: "Loser"
    };
    this.keys = {
      UP: 38,
      DOWN: 40,
      RIGHT: 39,
      LEFT: 37
    };

    /* Info Player Items */
    this.infoPlayerContainer;
    this.livesText;
    this.progressBar;
    this.time;
    this.counterLives;

    /* Mission */
    this.mission;
    this.missionContainer;
    this.missionImage;
    this.counterMission;
    this.missionImageEmpty;

    /* Obstacles */
    this.obstacle;
    this.obstacles;

    /*Levels*/
    this.level = 0;
    this.toxics;
  }

  start(spaceShipImg) {
    this.spaceShipImg = spaceShipImg;

    this.loadElements();

    this.setPlayerOnBoard();
    this.setMissionOnBoard();

    this.init();
  }

  init() {
    this.time = 100;
    this.counterLives = 3;
    this.counterMission = 0;
    this.status = undefined;
    this.obstacles = [];
    this.toxics = [];

    for (let i = 0; i < 3; ++i) {
      let starElement = document.getElementById("star-" + i);
      if (starElement) starElement.setAttribute("src", this.missionImageEmpty);
    }

    this.livesText.textContent = 3;
  }

  restart() {
    this.time = 100;
    this.progressBar.style.height = this.time + "%";

    this.setPlayerOnBoard();
    this.setMissionOnBoard();

    this.checkLevel();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  update() {
    this.updateTime();

    this.mission.draw();
    this.obstacles.forEach(obstacle => obstacle.draw());
    if (this.toxics.length > 0) this.toxics.forEach(toxic => toxic.draw());

    this.updatePlayer();
    this.obstacles.forEach(obstacle => obstacle.move());
  }

  updatePlayer() {
    this.ctx.save();
    this.player.move();
    this.player.draw();
    this.ctx.restore();
  }

  /****** OBSTACLES ******/
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
    this.obstacles = this.obstacles.filter(
      obstacle =>
        obstacle.posX >= -obstacle.width && obstacle.posX <= this.width
    );
  }
  /************************/

  /****** MISSION ******/
  collisionMission() {
    return (
      this.player.posX < this.mission.posX + this.mission.width &&
      this.player.posX + this.player.width >= this.mission.posX &&
      this.player.posY <= this.mission.posY
    );
  }

  winMission() {
    let starElement = document.getElementById("star-" + this.counterMission);

    if (starElement) {
      starElement.setAttribute("src", this.missionImage);
      this.counterMission++;
      this.level++;
    }

    this.counterMission >= 3
      ? (this.status = this.statusKey.WINNER)
      : this.restart();
  }
  /************************/

  /****** LEVELS ******/
  checkLevel() {
    if (this.level > 0) this.setToxicItem();
    if (this.level > 1) undefined;
  }

  setToxicItem() {
    this.toxics.push(
      new Toxic(this.ctx, this.width, this.height, "/res/img/poison.svg")
    );
  }

  collisionToxic() {
    return this.toxics.length === 0
      ? false
      : this.toxics.some(
          toxic =>
            this.player.posX < toxic.posX + toxic.width &&
            this.player.posX + this.player.width >= toxic.posX &&
            this.player.posY <= toxic.posY
        );
  }

  removeToxicItem() {
    debugger;
    this.toxics = this.toxics.filter(
      toxic =>
        this.player.posX >= toxic.posX + toxic.width &&
        this.player.posX + this.player.width < toxic.posX &&
        this.player.posY > toxic.posY
    );
  }
  /************************/

  /****** INFO PLAYER ITEMS ******/
  updateTime() {
    this.time -= 0.1;
    this.progressBar.style.height = this.time + "%";

    if (this.time <= 0 && this.counterLives > 0) this.playerLoseLive();
  }

  playerLoseLive() {
    this.counterLives--;
    this.livesText.textContent--;

    this.counterLives === 0
      ? (this.status = this.statusKey.LOSER)
      : this.restart();
  }
  /************************/

  /****** STATUS GAME ******/
  gameStatus() {
    return this.status === this.statusKey.WINNER ||
      this.status === this.statusKey.LOSER
      ? this.showGameStatus()
      : null;
  }

  showGameStatus() {
    this.optionMenu.style.display = "flex";
    this.canvas.style.display = "none";
    this.mainTitleOption.style.display = "none";
    this.statusTitleOption.style.display = "block";
    this.textQuestionOption.style.display = "block";

    this.status === this.statusKey.WINNER
      ? (this.statusTitleOption.textContent = "¡WINNER!")
      : (this.statusTitleOption.textContent = "GAME OVER");
  }
  /************************/

  /****** Load elements on Board ******/
  loadElements() {
    /* Game Board */
    this.canvas = document.getElementById("game-board");
    this.canvas.style.display = "block";
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    /* Option Menu */
    this.optionMenu = document.getElementById("option-board");
    this.mainTitleOption = document.getElementById("main-title-option-board");
    this.statusTitleOption = document.getElementById(
      "status-title-option-board"
    );
    this.textQuestionOption = document.getElementById("text-option-board");
    this.spaceShipChooserOption = document.getElementById("space-ship-chooser");
    this.spaceShipChooserOption.style.display = "none";
    this.optionMenu.style.display = "none";

    /* Info Player Items */
    this.infoPlayerContainer = document.getElementById("info-player-container");
    this.livesText = document.getElementById("lives-player");
    this.progressBar = document.getElementById("progress-bar");
    this.infoPlayerContainer.style.visibility = "visible";

    /* Mission */
    this.missionContainer = document.getElementById("mission-container");
    this.missionImage = "/res/img/star.svg";
    this.missionImageEmpty = "/res/img/star-empty.svg";
    this.missionContainer.style.visibility = "visible";
  }

  setPlayerOnBoard() {
    this.player = new Player(
      this.ctx,
      this.width,
      this.height,
      this.spaceShipImg,
      this.keys
    );
  }

  setMissionOnBoard() {
    this.mission = new Mission(
      this.ctx,
      this.width,
      this.height,
      "/res/img/star.svg"
    );
  }
  /************************/
}
