(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var self = entity.getSelf();

      var item = Object.assign({}, entity);
      item.isEnticement = true;
      item.update = update;
      item.handleDragStart = handleDragStart;
      item.handleDrag = handleDrag;
      item.handleDragEnd = handleDragEnd;
      return item;

      function update(timestamp, delta) {
        entity.update(timestamp, delta);
      }

      function handleDragStart(x, y) {
        var bounds = entity.getScreenBoundingRect();
        if (bounds.left < x &&
            bounds.right > x &&
            bounds.top < y &&
            bounds.bottom > y) {
          return true;
        }
        return false;
      }

      function handleDrag(x, y) {
        if (entity.getRenderX() > x)
          self.x -= 0.01;
        if (entity.getRenderX() < x)
          self.x += 0.01;
        if (entity.getRenderY() > y)
          self.y -= 0.01;
        if (entity.getRenderY() < y)
          self.y += 0.01;

        if (self.x > 1) {
          self.x = 1;
        }
        if (self.x < 0) {
          self.x = 0.01;
        }
        if (self.y > 1) {
          self.y = 1;
        }
        if (self.y < 0) {
          self.y = 0.01;
        }
      }

      function handleDragEnd() {
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
