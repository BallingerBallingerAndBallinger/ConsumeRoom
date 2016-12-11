(() => {
  var entityBase = require('../crappy-entity.js');

  var velocity = 0.01;

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var goingLeft = false;

      var self = entity.getSelf();
      self.name = 'bloon';
      self.x = Math.random() * (renderer.getWidth() / 2);
      self.y = Math.random();
      self.size = 400;
      var bloon = Object.assign({}, entity);
      var travel = 0;

      bloon.update = update;
      bloon.setX = setX;
      bloon.setY = setY;
      bloon.getX = getX;
      bloon.getY = getY;
      bloon.getZ = getZ;
      bloon.getHappiness = () => 100;
      bloon.isEnticement = true;
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

        render.image(entity.getRenderX(renderer), entity.getRenderY(renderer), self.name, '', entity.getRenderHeight(renderer));
      }

      function getX() {
        return self.x;
      }

      function getY() {
        return self.y;
      }

      function getZ() {
        return self.z;
      }

      function setX(newX) {
        self.x = newX;
      }

      function setY(newY) {
        self.y = newY;
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
