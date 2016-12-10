(function() {
  'use strict';

  var config = require('./configuration.js');
  var sprites = require('./crappy-sprites.js');

  window.onload = () => {
    sprites.initialize(document.getElementById('canvas'));
    sprites.update([
      { name: 'crappy-room', x: 10, y: 10, size: 200}
    ]);
    sprites.draw();
  };
})();
