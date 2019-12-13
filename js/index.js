window.onload = () => {
  let game = new Game();
  let framesCounter = 0;

  function step(timestap) {
    framesCounter++;

    if (framesCounter % 60 === 0) {
      framesCounter = 0;
      game.updateTime();
    }

    game.clearAll();
    game.drawAll();
    game.moveAll();

    if (game.collisionStar()) game.winStar();

    game.gameStatus();

    window.requestAnimationFrame(step);
  }

  document.getElementById("continue-btn").onclick = () => {
    game.start();
    window.requestAnimationFrame(step);
  };
};
