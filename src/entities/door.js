(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var door = Object.assign({}, entity);
      door.update = update;
      return door;

      function update(timestamp, delta) {
        render.image(830, 300, 'door', 55, 400);
      }
    };

    return constructor();

    function getX() {
      return self.x;
    }

    function getY() {
      return self.y;
    }

    function getZ() {
      return self.z;
    }
  }

  module.exports = {
    initialize: initialize
  };
})();
