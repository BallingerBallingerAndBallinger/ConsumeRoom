(() => {
  var entityBase = require('../crappy-entity.js');
  var doorBuilder = require('./door.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var door = doorBuilder.initialize(renderer);
      var render = renderer;

      var self = { name: 'floor-closed', x: 0, y: -1 };
      var eating = false;
      var chew = false;

      var room = Object.assign({}, entity);
      room.update = update;
      room.getX = getX;
      room.getY = getY;
      room.getZ = getZ;
      room.setEating = setEating;
      return room;

      function update(timestamp, delta) {
        if (eating) {
          if (Math.random() < 0.35) {
            chew = !chew;
          }
        }
        render.image(self.x, 200, 'room-base', 1000, '');

        if (eating && chew) {
          render.image(self.x, 500, 'floor-open', 1000, 500);
        } else {
          render.image(self.x, 500, 'floor-closed', 1000, 500);
        }

        door.update(timestamp, delta);
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

      function setEating(newEating) {
        eating = newEating;
        door.setClosed(newEating);
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
