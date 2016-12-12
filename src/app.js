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
    views.show('title-screen-view');
    views.wire('begin-game-button', quoteScreen);
  };

  function quoteScreen() {
    views.show('quote-view');
    views.wire('continue-button', startGame);
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
    gameState.initialize();
    var canvasElement = document.getElementById('canvas');
    entities.initialize(canvasElement);
    stats.initialize();
    gui.initialize(entities);
    gui.setPause(pause);
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
