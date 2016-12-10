(function() {
  'use strict';

  var config = require('./configuration.js');
  var sprites = require('./crappy-sprites.js');

  window.onload = () => {
    var canvasElement = document.getElementById('canvas');

    sprites.initialize(canvasElement);
    sprites.update([
      { name: 'crappy-room', x: 25, y: 10, size: 100 }
    ]);
    sprites.draw();

    drawTitle(canvasElement.getContext('2d'));
  };

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
