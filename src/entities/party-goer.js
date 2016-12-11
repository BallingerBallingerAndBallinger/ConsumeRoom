(() => {
  var entityBase = require('../crappy-entity.js');

  var velocity = 0.05;

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var self = {};
      self.name = 'girl1';
      self.x = 200 + Math.random() * (renderer.getWidth() / 2);
      self.z = Math.random();
      self.y = 0;
      self.size = 400;
      var goer = Object.assign({}, entity);

      var goingLeft = Math.random() > 0.5;
      var maxTravel = Math.random() * 100;
      var travel = 0;

      goer.update = update;
      goer.setX = setX;
      goer.getX = getX;
      goer.getY = getY;
      goer.getZ = getZ;
      goer.isPerson = true;
      return goer;

      function update(timestamp, delta) {
        var attemptedTravel = goingLeft ? -1 * velocity * delta : velocity * delta;
        var attemptedX = attemptedTravel + self.x;
        var toMove = checkMovement(attemptedX, self.y);

        if (travel > maxTravel || travel < -maxTravel) {
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
        var renderHeight = ((self.z / 2) + 0.5) * self.size;
        var renderY = (self.z * (0.5 * renderer.getHeight()) + (0.5 * renderer.getHeight()));
        renderY = renderY - renderHeight;
        renderY = renderY + (renderHeight / 10);

        render.image(renderX, renderY, self.name, '', renderHeight);
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

      function setZ(newZ) {
        self.z = newZ;
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
