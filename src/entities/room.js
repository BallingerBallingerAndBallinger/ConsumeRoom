(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var room = Object.assign({}, entity);
      room.update = update;
      return room;

      function update(timestamp, delta) {
        render.image(0, 500, 'floor-closed', 1000, 500);
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
