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
        getSelfY: getSelfY,
        getSelfX: getSelfX,
        getRenderHeight: getRenderHeight,
        getScreenBoundingRect: getScreenBoundingRect
      };

      function update(timestamp, delta) {

      }

      function getSelf() {
        return self;
      }

      function getSelfY(renderX, renderY) {
        var renderHeight = getRenderHeight();
        return ((renderY / renderHeight) + -0.5 + 1 + -(1 / 10)) / (0.8 * 0.5);
      }

      function getSelfX(renderX, renderY) {
        return (((renderX - 0.5) * 2) / (0.5 * self.y + 0.5)) + 1;
      }

      function getRenderX() {
        var squeezeFactor = (self.y / 2 + 0.5);
        var squeezed = (self.x - 0.5) * squeezeFactor + 0.5;
        return squeezed * renderer.getWidth() - 40;
      }

      function getRenderY() {
        var renderHeight = getRenderHeight();
        var renderY = ((self.y * 0.5) * (0.8 * renderer.getHeight()) + (0.5 * renderer.getHeight()));
        renderY = renderY - renderHeight;
        renderY = renderY + (renderHeight / 10);
        return renderY;
      }

      function getRenderHeight() {
        return ((self.y * 0.5555) + 0.3333) * self.size;
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
