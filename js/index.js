window.onload = () => {
  let game = new Game();
  let framesCounter = 0;
  let requestID;
  let pause = false;

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

    if (game.collisionObstacle()) {
      game.playerLoseLive();
      pause = true;
    }
    if (game.collisionMission()) {
      game.winMission();
      pause = true;
    }
    if (game.level > 0 && game.collisionToxic()) {
      game.removeToxicItem();
      game.invertObstaclesParameters();
      game.invertObstaclesOnBoard();
    }

    if (game.gameStatus() !== null) window.cancelAnimationFrame(requestID);
    else if (!pause) window.requestAnimationFrame(step);
    else {
      setTimeout(() => {
        window.requestAnimationFrame(step);
        pause = false;
      }, 150);
    }
  }

  startGameBtn.onclick = () => {
    game.start(spaceShips[index].src);
    requestID = window.requestAnimationFrame(step);
  };

  arrowLeftOption.onclick = () => {
    index = index == 0 ? spaceShips.length - 1 : --index;
    spaceShipImageOption.setAttribute("src", spaceShips[index].src);
  };

  arrowRightOption.onclick = () => {
    index = index == spaceShips.length - 1 ? 0 : ++index;
    spaceShipImageOption.setAttribute("src", spaceShips[index].src);
  };
};
