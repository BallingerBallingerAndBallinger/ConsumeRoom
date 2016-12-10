(() => {
  var entityBase = require('../crappy-entity.js');

  var velocity = 0.01;

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var self = {};
      self.name = 'girl1';
      self.x = Math.random() * renderer.getWidth();
      self.z = Math.random() * 100;
      self.y = 0;
      self.size = 400;
      var goer = Object.assign({}, entity);

      var goingLeft = false;
      var travel = 0;

      goer.update = update;
      goer.setX = setX;
      return goer;

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

        var renderX = self.x;
        var renderHeight = (((self.z / 100) / 2) + 0.5) * self.size;
        var renderY = ((self.z / 100) * (0.5 * renderer.getHeight()) + (0.5 * renderer.getHeight())) - renderHeight;

        render.image(renderX, renderY, self.name, renderHeight, renderHeight);
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
