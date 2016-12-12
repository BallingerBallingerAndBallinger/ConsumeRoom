(() => {
  var entityBase = require('../../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var self = entity.getSelf();
      self.name = 'house-plant';
      self.x = Math.random();
      self.y = Math.random();
      self.size = 150;
      var plant = Object.assign({}, entity);
      var squish = 0;
      var isSquishing;

      plant.update = update;
      plant.getX = getX;
      plant.getY = getY;
      plant.getZ = getZ;
      plant.setX = setX;
      plant.setY = setY;
      plant.handleClick = handleClick;
      plant.getHappiness = () => 33;
      plant.isEnticement = true;
      return plant;

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

      function update(timestamp, delta) {
        render.image(entity.getRenderX(renderer), entity.getRenderY(renderer), self.name, entity.getRenderHeight(renderer));
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
