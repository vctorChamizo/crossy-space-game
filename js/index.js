window.onload = () => {
  let game = new Game();
  game.init();

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

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
};
