(function() {
  'use strict';

  var config = require('./configuration.js');
  var sprites = require('./crappy-sprites.js');

  window.onload = () => {
    sprites.initialize(document.getElementById('canvas'));
    sprites.update([
      { name: 'crappy-room', x: 25, y: 10, size: 100 },
      { name: 'crappy-party-dude', x: 50, y: 45, size: 50 },
      { name: 'crappy-party-dude', x: 90, y: 30, size: 40 },
      { name: 'crappy-party-dude', x: 25, y: 10, size: 30 }
    ]);
    sprites.draw();
  };
})();
