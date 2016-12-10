(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod);
      var render = renderer;

      var squishVelocity = 0.05;

      var self = { name: 'bear', x: 100, y: 400, size: 150 };
      var bear = Object.assign({}, entity);
      var squish = 0;
      var isSquishing;

      bear.update = update;
      bear.setX = setX;
      bear.setY = setY;
      return bear;

      function update(timestamp, delta) {
        if (!isSquishing) {
          if (Math.random() < 0.01) {
            console.log('Bear Squish!');
            isSquishing = true;
            squish = 30;
          }
        }

        var squished = 0;
        if (squish > 0) {
          squish = squish - (squishVelocity * delta);
          squished = squish;
        } else {
          isSquishing = false;
        }

        render.image(self.x, self.y + squished, self.name, self.size, self.size - squished);
      }

      function setX(newX) {
        self.x = newX;
      }

      function setY(newY) {
        self.y = newY;
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
