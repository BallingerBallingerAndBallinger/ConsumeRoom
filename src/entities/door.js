(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;
      var closed = false;
      var self = { name: door, y: -1 };

      var door = Object.assign({}, entity);
      door.update = update;
      door.getX = getX;
      door.getY = getY;
      door.getZ = getZ;
      door.setClosed = setClosed;
      return door;

      function setClosed(newClosed) {
        if (closed !== newClosed) {
          if (newClosed) {
            render.stopAudio('slam');
            render.audio('slam');
          }
        }
        closed = newClosed;
      }

      function update(timestamp, delta) {
        if (closed) {
          render.image(630, 353, 'closed-door', 80, 148);
        } else {
          render.image(710, 350, 'open-door', 55, '');
        }
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
