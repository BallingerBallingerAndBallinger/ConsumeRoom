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
  }

  module.exports = {
    initialize: initialize
  };
})();
