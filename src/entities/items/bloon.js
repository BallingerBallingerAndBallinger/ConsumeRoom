(() => {
  var entityBase = require('../item.js');
  var configuration = require('../../configuration.js');

  var velocity = 0.00001;

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var goingLeft = false;

      var self = entity.getSelf();
      self.name = 'bloon';
      self.x = Math.random();
      self.y = Math.random();
      self.size = 400;
      var bloon = Object.assign({}, entity);
      var travel = 0;

      bloon.update = update;
      bloon.getHappiness = () => configuration.bloon.happiness;
      bloon.setGetHappiness = setGetHappiness;
      bloon.isEnticement = true;
      return bloon;

      function setGetHappiness(happinessFn) {
        bloon.getHappiness = happinessFn;
      }

      function update(timestamp, delta) {
        var attemptedTravel = goingLeft ? -1 * velocity * delta : velocity * delta;
        var attemptedX = attemptedTravel + self.x;
        var toMove = movementHandler.check(attemptedX, self.y);

        if (travel > 0.01 || travel < -0.01) {
          goingLeft = !goingLeft;
          travel = 0;
        }

        if (toMove === false) {
          goingLeft = !goingLeft;
        } else {
          self.x = attemptedX;
          travel += attemptedTravel;
        };

        render.image(entity.getRenderX(), entity.getRenderY(), self.name, '', entity.getRenderHeight());
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
