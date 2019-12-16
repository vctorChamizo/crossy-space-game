window.onload = () => {
  let game = new Game();
  let framesCounter = 0;
  let requestID;

  function step() {
    framesCounter++;
    game.clear();

    game.update();

    if (game.collisionObstacle()) game.playerLoseLive();
    if (game.collisionMission()) game.winMission();

    game.gameStatus() !== null
      ? window.cancelAnimationFrame(requestID)
      : window.requestAnimationFrame(step);

    if (framesCounter % 25 === 0) {
      game.generateObstacles();
    }
    game.clearObstacles();
  }

  document.getElementById("continue-btn").onclick = () => {
    game.start();
    requestID = window.requestAnimationFrame(step);
  };
};
