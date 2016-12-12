(() => {
  var entityBase = require('../item.js');
  var configuration = require('../../configuration.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var self = entity.getSelf();
      self.name = 'house-plant';
      self.x = Math.random();
      self.y = Math.random();
      self.size = 350;
      var plant = Object.assign({}, entity);

      plant.update = update;
      plant.handleClick = handleClick;
      plant.getHappiness = () => configuration.plant.happiness;
      plant.isEnticement = true;
      return plant;

      function handleClick(x, y) {
        var bounds = entity.getScreenBoundingRect();
        if (bounds.left < x &&
            bounds.right > x &&
            bounds.top < y &&
            bounds.bottom > y) {
          return true;
        }
        return false;
      }

      function update(timestamp, delta) {
        render.image(entity.getRenderX(), entity.getRenderY(), self.name, '', entity.getRenderHeight());
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
