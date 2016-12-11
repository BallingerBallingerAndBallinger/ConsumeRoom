(() => {
  var entityBase = require('../../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var squishVelocity = 0.05;

      var self = entity.getSelf();
      self.name = 'bear';
      self.x = Math.random();
      self.y = 1;
      self.size = 150;
      var bear = Object.assign({}, entity);
      var squish = 0;
      var isSquishing;

      bear.update = update;
      bear.getX = getX;
      bear.getY = getY;
      bear.getZ = getZ;
      bear.setX = setX;
      bear.setY = setY;
      bear.handleClick = handleClick;
      bear.getHappiness = () => 33;
      bear.isEnticement = true;
      return bear;

      function handleClick(x, y) {
        var bounds = entity.getScreenBoundingRect();
        if (bounds.left < x &&
            bounds.right > x &&
            bounds.top < y &&
            bounds.bottom > y) {
          squeak();
          return true;
        }
        return false;
      }

      function squeak() {
        isSquishing = true;
        squish = 30;
        render.audio('squeak');
      }

      function update(timestamp, delta) {
        if (!isSquishing) {
          if (Math.random() < 0.0001) {
            squeak();
          }
        }

        var squished = 0;
        if (squish > 0) {
          squish = squish - (squishVelocity * delta);
          squished = squish;
        } else {
          isSquishing = false;
        }

        render.image(entity.getRenderX(renderer), entity.getRenderY(renderer) + squished, self.name, entity.getRenderHeight(renderer), entity.getRenderHeight(renderer) - squished);
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
