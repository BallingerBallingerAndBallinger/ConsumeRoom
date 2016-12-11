/* globals requestAnimationFrame */
(function() {
  'use strict';

  var entities = require('./crappy-entities.js');
  var stats = require('./crappy-stats.js');
  var gameState = require('./crappy-state.js');

  window.onload = () => {
    var canvasElement = document.getElementById('canvas');
    entities.initialize(canvasElement);
    stats.initialize();
    requestAnimationFrame(grandLoop);
  };

  function grandLoop(timestamp) {
    drawFrame(timestamp);
    requestAnimationFrame(grandLoop);
  }

  function drawFrame(timestamp) {
    var delta = getDelta(timestamp);
    if (delta < 50) return;


    if (Math.random() < 0.001) {
      gameState.bankHappiness(-1);
    }
    updateDelta(timestamp);
    entities.update(timestamp, delta);
    stats.draw(gameState);
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
