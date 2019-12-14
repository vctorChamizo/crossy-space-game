window.onload = () => {
  let game = new Game();
  let framesCounter = 0;

  function step(timestap) {
    framesCounter++;

    if (framesCounter % 1 === 0) {
      game.updateTime();
    }

    if (framesCounter % 240 === 0) game.generateObstacles();

    game.clearAll();
    game.update();

    if (game.collisionStar()) game.winStar();

    game.gameStatus();

    window.requestAnimationFrame(step);
  }

  document.getElementById("continue-btn").onclick = () => {
    game.start();
    window.requestAnimationFrame(step);
  };
};
