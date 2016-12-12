/* globals requestAnimationFrame */
(function() {
  'use strict';

  var entities = require('./crappy-entities.js');
  var stats = require('./gui/crappy-stats.js');
  var gui = require('./gui/crappy-gui.js');
  var views = require('./gui/crappy-views.js');
  var gameState = require('./crappy-state.js');
  var config = require('./configuration.js');

  var paused = false;
  var stopped = true;

  window.onload = () => {
    views.initialize();
    views.wire('begin-game-button', quoteScreen);
    views.wire('continue-button', startGame);
    views.wire('start-over-button', start);
    views.wire('continue-after-win-button', continueAfterWin);
    start();
  };

  function start() {
    views.show('title-screen-view');
  }

  function quoteScreen() {
    views.show('quote-view');
  }

  function win() {
    paused = true;
    views.show('win-view');
  }

  function continueAfterWin() {
    paused = false;
    views.show();
  }

  function startGame() {
    views.show();
    stopped = false;

    var canvasElement = document.getElementById('canvas');

    gameState.initialize();
    entities.initialize(canvasElement);
    stats.initialize();
    gui.initialize(entities);
    gui.setPause(pause);
    gui.setWin(win);
    requestAnimationFrame(grandLoop);
  }

  function grandLoop(timestamp) {
    if (stopped) return;
    drawFrame(timestamp);
    requestAnimationFrame(grandLoop);
  }

  function drawFrame(timestamp) {
    var delta = getDelta(timestamp);
    if (delta < config.frameMs) return;
    updateDelta(timestamp);

    if (paused) {
      return;
    }

    if (Math.random() < config.baseHungerProbability) {
      gameState.bankHappiness(-1);
      if (gameState.getHappiness() < 0) {
        gameOver();
      }
    }
    entities.update(timestamp, delta);
    stats.draw(gameState);
  }

  function pause() {
    paused = !paused;
    gui.showPaused(paused);
  }

  function gameOver() {
    stopped = true;
    entities.gameOver();
    gui.showShop(false);
    views.show('game-over-view');
  }

  var last;
  function getDelta(timestamp) {
    if (last === undefined) {
      last = timestamp;
      return 0;
    }

    return timestamp - last;
  }

  function updateDelta(timestamp) {
    last = timestamp;
  }
})();
