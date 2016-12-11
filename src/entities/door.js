(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;
      var self = { name: door, y: -1 };

      var door = Object.assign({}, entity);
      door.update = update;
      door.getX = getX;
      door.getY = getY;
      door.getZ = getZ;
      return door;

      function update(timestamp, delta) {
        render.image(830, 300, 'door', 55, 400);
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
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
