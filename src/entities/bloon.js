(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(canvasElement, moveMethod) {
    var constructor = () => {
      var entity = entityBase.initialize(canvasElement, moveMethod);
      var self = { name: 'bloon', x: 1, y: 2 };
      var bloon = Object.assign({}, entity);
      bloon.update = update;
      return bloon;

      function update(timestamp, delta) {
        moveMethod(self, 10, 10);
        console.log('Totally rendering a bloon right meow');
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
