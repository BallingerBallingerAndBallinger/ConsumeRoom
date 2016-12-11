(() => {
  var entityBase = require('../party-goer.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var self = entity.getSelf();
      self.name = 'crappy-party-dude';
      self.size = 400;

      var goer = Object.assign({}, entity);
      goer.update = update;
      return goer;

      function update(timestamp, delta) {
        draw(timestamp, delta);
        entity.update(timestamp, delta);
      }

      function draw(timestamp, delta) {
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
