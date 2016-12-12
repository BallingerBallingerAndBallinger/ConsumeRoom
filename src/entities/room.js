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
      var puckeringFactor = 1;

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
          puckeringFactor = Math.random() > 0.5 ? puckeringFactor + 0.01 : puckeringFactor - 0.01;
        } else {
          puckeringFactor = 1;
        }


        var width  = 350 * puckeringFactor;
        var height = 350 * puckeringFactor * (300 / 428);

        if (eating) {
          render.image(500 - (width / 2), 750 - (height / 2), 'floor-open', width, height);
        } else {
          render.image(500 - (width / 2), 750 - (height / 2), 'floor-closed', width, height);
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
