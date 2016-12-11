(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var self = { name: 'floor-closed', x: 0, y: -1 };
      var room = Object.assign({}, entity);
      room.update = update;
      room.getX = getX;
      room.getY = getY;
      room.getZ = getZ;
      room.setEating = setEating;
      return room;

      function update(timestamp, delta) {
        render.image(self.x, 500, self.name, 1000, 500);
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

      function setEating(eating) {
        self.name = eating ? 'floor-open' : 'floor-closed';
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
