window.onload = () => {
  let game = new Game();
  game.init();

  function step(timestap) {
    game.clearAll();
    game.drawAll();
    game.moveAll();

    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
};
