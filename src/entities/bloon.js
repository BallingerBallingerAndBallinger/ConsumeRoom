(() => {
  var entityBase = require('../crappy-entity.js');

  var velocity = 0.01;

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var goingLeft = false;

      var self = { name: 'bloon', x: 100, y: 400, size: 300 };
      var bloon = Object.assign({}, entity);
      var travel = 0;

      bloon.update = update;
      bloon.setX = setX;
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

        render.image(self.x, self.y, self.name, self.size, self.size);
      }

      function setX(newX) {
        self.x = newX;
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
