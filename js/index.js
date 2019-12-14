window.onload = () => {
  let game = new Game();
  let framesCounter = 0;
  let requestID;

  function step(timestap) {
    framesCounter++;

    if (framesCounter % 1 === 0) {
      game.updateTime();
    }

    if (framesCounter % 240 === 0) game.generateObstacles();

    game.clearAll();
    game.update();

    if (game.collisionObstacle()) game.loseLive();
    if (game.collisionStar()) game.winStar();

    game.gameStatus() !== null
      ? window.cancelAnimationFrame(requestID)
      : window.requestAnimationFrame(step);
  }

  document.getElementById("continue-btn").onclick = () => {
    game.start();
    requestID = window.requestAnimationFrame(step);
  };
};
