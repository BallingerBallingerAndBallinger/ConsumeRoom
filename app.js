(function() {
  'use strict';

  var config = require('./configuration.js');

  window.onload = () => {
    var canvas = document.getElementById('canvas').getContext('2d');
    canvas.fillText('Hello World', 10, 50);
    canvas.fillText(config.title, 80, 50);
  };
})();
