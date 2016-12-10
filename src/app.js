/* globals requestAnimationFrame */
(function() {
  'use strict';

  var config = require('./configuration.js');
  var sprites = require('./crappy-sprites.js');

  var canvasElement;
  window.onload = () => {
    canvasElement = document.getElementById('canvas');
    sprites.initialize(canvasElement);
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

    sprites.update([
      { name: 'crappy-room', x: 25, y: 10, size: 100 },
      { name: 'crappy-party-dude', x: Math.random() * 50, y: 45, size: 50 },
      { name: 'crappy-party-dude', x: 90, y: 30, size: 40 },
      { name: 'crappy-party-dude', x: 25, y: 10, size: 30 }
    ]);
    sprites.draw();
    drawTitle(canvasElement.getContext('2d'));
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

  // Taken from a horrific w3c example
  function drawTitle(ctx) {
    ctx.font = '16px Verdana';
    // Create gradient
    var gradient = ctx.createLinearGradient(0, 0, 500, 0);
    gradient.addColorStop('0', 'magenta');
    gradient.addColorStop('0.5', 'blue');
    gradient.addColorStop('1.0', 'red');
    // Fill with gradient

    var oldFill = ctx.fillStyle;
    ctx.fillStyle = gradient;

    ctx.fillText(config.title, 22, 16);
    ctx.fillStyle = oldFill;
  }
})();
