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

      var room = Object.assign({}, entity);
      room.update = update;
      room.getX = getX;
      room.getY = getY;
      room.getZ = getZ;
      room.setEating = setEating;
      return room;

      function update(timestamp, delta) {
        render.image(self.x, 200, 'room-base', 1000, '');

        if (eating) {
          render.image(325, 600, 'floor-open', 350, '');
        } else {
          render.image(325, 600, 'floor-closed', 350, '');
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
        if (eating !== newEating) {
          if (newEating) {
            render.stopAudio('eat');
            render.audio('eat');
          }
        }
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
