(function() {
  // Includes
  var _ = require('lodash');

  function initialize(renderer, movementHandler) {
    var initializer = () => {
      var self = {name: 'generic', x: 0.5, y: 0.5, vx: 0, vy: 0, gx: 0, gy: 0, size: 0};
      return {
        update: update,
        // Getters and setters
        getSelf: getSelf,
        setX: setX,
        setY: setY,
        getX: getX,
        getY: getY,
        getRenderX: getRenderX,
        getRenderY: getRenderY,
        getRenderHeight: getRenderHeight,
        getScreenBoundingRect: getScreenBoundingRect
      };

      function update(timestamp, delta) {
      }

      function getSelf() {
        return self;
      }

      function getRenderX() {
        var squeezeFactor = (self.y / 2 + 0.5);
        var squeezed = (self.x - 0.5) * squeezeFactor + 0.5;
        return squeezed * renderer.getWidth() - 40;
      }

      function getRenderHeight() {
        return ((self.y * 0.6666) + 0.3333) * self.size;
      }

      function getRenderY() {
        var renderHeight = getRenderHeight();
        var renderY = (self.y * (0.5 * renderer.getHeight()) + (0.5 * renderer.getHeight()));
        renderY = renderY - renderHeight;
        renderY = renderY + (renderHeight / 10);
        return renderY;
      }

      function getScreenBoundingRect() {
        return {
          left: getRenderX(),
          right: getRenderX() + getRenderHeight(),
          top: getRenderY(),
          bottom: getRenderY() + getRenderHeight()
        };
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

      function setY(newY) {
        self.y = newY;
      }
    };
    return initializer();
  }

  // Exports
  module.exports = {
    initialize: initialize
  };
})();
