(() => {
  var entityBase = require('../../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;

      var self = entity.getSelf();
      self.name = 'disco';
      self.x = Math.random();
      self.y = Math.random() * 0.25;
      self.size = 200;

      var starX = Math.random();
      var starY = Math.random();
      var starMove = 0;

      var disco = Object.assign({}, entity);
      disco.update = update;
      disco.getHappiness = () => 100;
      disco.isEnticement = true;
      return disco;

      function update(timestamp, delta) {
        var renderHeight = entity.getRenderHeight();
        var renderX = entity.getRenderX();
        var renderY = entity.getRenderY() + -300 + renderHeight * 0.5;

        starMove -= delta;
        if (starMove <= 0) {
          starMove = Math.random() * 3000;
          starX = Math.random();
          starY = Math.random();
        }

        render.image(renderX, renderY, self.name, '', renderHeight);
        render.image(renderX + (starX * renderHeight) - (renderHeight / 10), renderY + (starY * renderHeight) - (renderHeight / 10), 'stars', '', renderHeight / 5);
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
