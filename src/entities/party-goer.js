(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, moveMethod, checkMovement) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, moveMethod, checkMovement);
      var render = renderer;

      var self = entity.getSelf();
      self.name = 'girl1';
      self.x = Math.random();
      self.y = Math.random();
      self.size = 400;
      var goer = Object.assign({}, entity);
      goer.update = update;
      goer.setX = setX;
      goer.getX = getX;
      goer.getY = getY;
      goer.isPerson = true;
      return goer;

      function update(timestamp, delta) {
        entity.update(timestamp, delta);
        render.image(entity.getRenderX(renderer), entity.getRenderY(renderer), self.name, '', entity.getRenderHeight(renderer));
      }

      function getX() {
        return self.x;
      }

      function getY() {
        return self.y;
      }

      function setX(newX) {
        self.x = newX;
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
