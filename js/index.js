window.onload = () => {
  let game = new Game();
  let framesCounter = 0;
  let requestID;
  let pause = false;

  let keyAudios = {
    BATTLESHIP: 0,
    OBSTACLE: 1,
    MISSION: 2,
    TOXIC: 3,
    WINNER: 4,
    LOSER: 5,
    SPACE: 6
  };

  let audios = new Audio(keyAudios);

  let startGameBtn = document.getElementById("start-game-btn");
  let spaceShipImageOption = document.getElementById("space-ship-img");
  let arrowRightOption = document.getElementById("arrow-right");
  let arrowLeftOption = document.getElementById("arrow-left");

  let index = 0;

  function step() {
    framesCounter++;

    game.clear();
    game.update();

    if (framesCounter % 25 === 0) game.generateObstacles();
    game.clearObstacles();

    if (game.collisionObstacle() || game.updateTime()) {
      audios.play(keyAudios.OBSTACLE);
      game.playerLoseLive();
      pause = true;
    }
    if (game.collisionMission()) {
      audios.play(keyAudios.MISSION);
      game.winMission();
      pause = true;
    }
    if (game.level > 0 && game.collisionToxic()) {
      audios.play(keyAudios.TOXIC);
      game.removeToxicItem();
      game.invertObstacles();
    }

    if (game.gameStatus() !== null) {
      audios.stop(keyAudios.BATTLESHIP);
      window.cancelAnimationFrame(requestID);
      !game.gameStatus()
        ? audios.play(keyAudios.WINNER)
        : audios.play(keyAudios.LOSER);
    } else if (pause) {
      setTimeout(() => {
        window.requestAnimationFrame(step);
        pause = false;
      }, 300);
    } else window.requestAnimationFrame(step);
  }

  startGameBtn.onclick = () => {
    audios.play(keyAudios.BATTLESHIP);
    game.start(spaceShips[index].src);
    requestID = window.requestAnimationFrame(step);
  };

  arrowLeftOption.onclick = () => {
    audios.play(keyAudios.SPACE);
    index = index == 0 ? spaceShips.length - 1 : --index;
    spaceShipImageOption.setAttribute("src", spaceShips[index].src);
  };

  arrowRightOption.onclick = () => {
    audios.play(keyAudios.SPACE);
    index = index == spaceShips.length - 1 ? 0 : ++index;
    spaceShipImageOption.setAttribute("src", spaceShips[index].src);
  };
};
