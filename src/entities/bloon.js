(() => {
  var entityBase = require('../crappy-entity.js');

  var velocity = 0.01;

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var goingLeft = false;

      var self = { name: 'bloon', x: 100, y: 400, size: 100 };
      var bloon = Object.assign({}, entity);
      var travel = 0;

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

        console.log(self.x);
        render.circle(self.x, self.y, 50, 'black', 'red');
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
