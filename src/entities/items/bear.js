(() => {
  var entityBase = require('../../crappy-entity.js');
  var configuration = require('../../configuration.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var squishVelocity = 0.05;

      var self = entity.getSelf();
      self.name = 'bear';
      self.x = Math.random();
      self.y = Math.random();
      self.size = 150;
      var bear = Object.assign({}, entity);
      var squish = 0;
      var isSquishing;

      bear.update = update;
      bear.handleClick = handleClick;
      bear.getHappiness = () => configuration.bear.happiness;
      bear.isEnticement = true;
      return bear;

      function handleClick(x, y) {
        var bounds = entity.getScreenBoundingRect();
        if (bounds.left < x &&
            bounds.right > x &&
            bounds.top < y &&
            bounds.bottom > y) {
          squeak();
          return true;
        }
        return false;
      }

      function squeak() {
        isSquishing = true;
        squish = 30;
        render.audio('squeak');
      }

      function update(timestamp, delta) {
        if (!isSquishing) {
          if (Math.random() < 0.0001) {
            squeak();
          }
        }

        var squished = 0;
        if (squish > 0) {
          squish = squish - (squishVelocity * delta);
          squished = squish;
        } else {
          isSquishing = false;
        }

        render.image(entity.getRenderX(), entity.getRenderY() + squished, self.name, entity.getRenderHeight(), entity.getRenderHeight() - squished);
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
