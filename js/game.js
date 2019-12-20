const MAX_LEVEL = 3;
const MAX_LIVES = 3;
const VELOCITY = 2.5;

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
      WINNER: 0,
      LOSER: 1
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
    this.missionWrapper;
    this.missionImage;
    this.counterMission;
    this.missionImageEmpty;

    /* Obstacles */
    this.obstacles_data = obstacles_data;
    this.obstacle;
    this.obstacles;
    this.keysDirection = {
      RIGHT: 0,
      LEFT: 1
    };

    /*Levels*/
    this.level;
    this.toxics;
  }

  /****** GLOBAL ******/
  start(spaceShipImg) {
    this.spaceShipImg = spaceShipImg;

    this.loadElements();

    this.setPlayerOnBoard();
    this.setMissionOnBoard();

    this.init();
  }

  init() {
    this.time = 100;
    this.counterLives = MAX_LIVES;
    this.counterMission = 0;
    this.status = undefined;
    this.obstacles = [];
    this.toxics = [];
    this.level = 0;

    this.loadVelocityObstacles();

    this.missionWrapper.innerHTML = "";

    for (let i = 0; i < MAX_LIVES; ++i) {
      let mission = document.createElement("img");
      mission.setAttribute("id", "star-" + i);
      mission.setAttribute("class", "mission");
      mission.setAttribute("src", this.missionImageEmpty);
      this.missionWrapper.appendChild(mission);
    }

    this.livesText.textContent = MAX_LIVES;
  }

  restart() {
    this.time = 100;
    this.progressBar.style.height = this.time + "%";

    this.setPlayerOnBoard();
    this.setMissionOnBoard();

    if (this.level > 0) this.setToxicItem();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  update() {
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
  loadVelocityObstacles() {
    let loadVelocity = function(elem) {
      elem.vx = VELOCITY;
    };

    this.obstacles_data.map(obs => loadVelocity(obs));
  }

  generateObstacles() {
    this.obstacles.push(
      new Obstacle(this.ctx, this.width, this.height, this.keysDirection)
    );
  }

  collisionObstacle() {
    return this.obstacles.some(obs => obs.isCollision(this.player));
  }

  clearObstacles() {
    this.obstacles = this.obstacles.filter(obs => obs.isOutOfRange());
  }

  invertObstacles() {
    let invert = function(elem) {
      elem.direction = elem.direction === 1 ? 0 : 1;
    };

    this.obstacles.map(obs => invert(obs));
    this.obstacles_data.map(obs => invert(obs));
  }

  accelerateObstacles() {
    let accelerate = function(elem) {
      elem.vx *= 2;
    };

    this.obstacles_data.map(obs => accelerate(obs));
    this.obstacles.map(obs => accelerate(obs));
  }

  /****** MISSION ******/
  collisionMission() {
    return this.mission.isCollision(this.player);
  }

  winMission() {
    document
      .getElementById("star-" + this.counterMission)
      .setAttribute("src", this.missionImage);

    this.level++;
    this.counterMission++;

    if (this.level === MAX_LEVEL - 1) this.accelerateObstacles();

    this.player.remove();
    this.mission.remove();
    this.mission.drawWin();

    this.counterMission >= MAX_LEVEL
      ? (this.status = this.statusKey.WINNER)
      : this.restart();
  }

  /****** LEVELS ******/
  setToxicItem() {
    this.toxics.push(
      new Toxic(this.ctx, this.width, this.height, "./res/img/poison.svg")
    );
  }

  collisionToxic() {
    return this.toxics.some(toxic => toxic.isCollision(this.player));
  }

  removeToxicItem() {
    this.toxics = this.toxics.filter(toxic => !toxic.isCollision(this.player));
  }

  /****** INFO PLAYER ITEMS ******/
  updateTime() {
    this.time -= 0.1;
    this.progressBar.style.height = this.time + "%";

    return this.time <= 0 && this.counterLives > 0;
  }

  playerLoseLive() {
    this.counterLives--;
    this.livesText.textContent--;

    this.player.remove();
    this.player.drawDeath();

    this.counterLives === 0
      ? (this.status = this.statusKey.LOSER)
      : this.restart();
  }

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

    return this.status;
  }

  /****** LOAD ELEMENTS ON BOARD ******/
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
    this.missionWrapper = document.getElementById("mission-wrapper");
    this.missionImage = "./res/img/star.svg";
    this.missionImageEmpty = "./res/img/star-empty.svg";
    this.missionContainer.style.visibility = "visible";
  }

  setPlayerOnBoard() {
    this.player = new Player(
      this.ctx,
      this.width,
      this.height,
      65,
      65,
      this.spaceShipImg,
      this.keys
    );
  }

  setMissionOnBoard() {
    this.mission = new Mission(
      this.ctx,
      this.width,
      this.height,
      25,
      25,
      "./res/img/star.svg"
    );
  }
}
