/* globals requestAnimationFrame */
(function() {
  'use strict';

  var entities = require('./crappy-entities.js');
  var stats = require('./crappy-stats.js');

  window.onload = () => {
    var canvasElement = document.getElementById('canvas');
    entities.initialize(canvasElement, stats);
    requestAnimationFrame(grandLoop);
  };

  function grandLoop(timestamp) {
    drawFrame(timestamp);
    requestAnimationFrame(grandLoop);
  }

  function drawFrame(timestamp) {
    var delta = getDelta(timestamp);
    if (delta < 50) return;
    updateDelta(timestamp);
    entities.render(timestamp, delta);
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
