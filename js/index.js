window.onload = () => {
  let game = new Game();
  game.init();

  function step(timestap) {
    game.clearAll();
    game.drawAll();
    game.moveAll();

    if (game.collisionStar()) console.log("ha tocado estrella");

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
};
