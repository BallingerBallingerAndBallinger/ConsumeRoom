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
        render.rectangle(0, 0, 1000, 1000, 'black', 'grey');
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
