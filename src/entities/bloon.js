(() => {
  var entityBase = require('../crappy-entity.js');
  var sprites = require('../crappy-sprites.js');

  function initialize(canvasElement, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(canvasElement,
                                         moveMethod);
      sprites.initialize(canvasElement);

      var goingLeft = false;

      var self = { name: 'bloon', x: 100, y: 400, size: 100 };
      var bloon = Object.assign({}, entity);

      bloon.update = update;
      return bloon;

      function update(timestamp, delta) {
        var attemptedX = goingLeft ? self.x - 10 : self.x + 10;
        var toMove = checkMovement(attemptedX, self.y);

        if (toMove === false) {
          goingLeft === !goingLeft;
        } else {
          self.x = attemptedX;
        };

        sprites.update([self]);
        sprites.draw();
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
