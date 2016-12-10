(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var goingLeft = false;

      var self = { name: 'bloon', x: 100, y: 400, size: 100 };
      var bloon = Object.assign({}, entity);

      bloon.update = update;
      return bloon;

      function update(timestamp, delta) {
        var attemptedX = goingLeft ? self.x - 10 : self.x + 10;
        var toMove = checkMovement(attemptedX, self.y);

        if (toMove === false) {
          goingLeft = !goingLeft;
        } else {
          self.x = attemptedX;
        };

        render.circle(self.x, self.y, 'black', 'red');
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
