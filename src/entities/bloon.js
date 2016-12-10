(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(canvasElement, moveEntity) {
    var constructor = () => {
      var entity = entityBase.initialize(canvasElement, moveEntity);
      entity.update = update;
      return entity;

      function update(timestamp, delta) {
        console.log('Totally rendering a bloon right meow');
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
