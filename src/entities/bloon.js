(() => {
  var entityBase = require('../crappy-entity.js');
  var sprites = require('../crappy-sprites.js');

  var velocity = 0.01;

  function initialize(canvasElement, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(canvasElement, moveMethod);
      var self = { name: 'bloon', x: 100, y: 400, size: 100 };
      var bloon = Object.assign({}, entity);
      var goingLeft = false;
      var travel = 0;

      sprites.initialize(canvasElement);

      bloon.update = update;
      return bloon;

      function update(timestamp, delta) {
        var attemptedTravel = goingLeft ? -1 * velocity * delta : velocity * delta;
        var attemptedX = attemptedTravel + self.x;
        var toMove = checkMovement(attemptedX, self.y);

        if (travel > 10 || travel < -10) {
          goingLeft = !goingLeft;
          travel = 0;
        }

        if (toMove === false) {
          goingLeft = !goingLeft;
        } else {
          self.x = attemptedX;
          travel += attemptedTravel;
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
