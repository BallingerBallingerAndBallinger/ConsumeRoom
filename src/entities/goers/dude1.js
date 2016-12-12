(() => {
  var entityBase = require('../party-goer.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);

      var self = entity.getSelf();
      self.name = (Math.random() > 0.5) ? 'hipsterbro1' : 'hipsterbro2';
      self.size = 400;

      var goer = Object.assign({}, entity);
      goer.update = update;
      return goer;

      function update(timestamp, delta) {
        entity.update(timestamp, delta);
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
