(function() {
  // Includes
  var _ = require('lodash');

  function initialize(renderer, moveMethod, checkMovement) {
    var initializer = () => {
      var self = {name: 'generic', x: 1, y: 2, vx: 0, vy: 0, gx: 0, gy: 0, size: 0};
      var render = renderer;
      var steps = 0;
      return {
        update: update,
        setGoal: setGoal,
        getSelf: getSelf,
        getRenderX: getRenderX,
        getRenderY: getRenderY,
        getRenderHeight: getRenderHeight
      };

      function update(timestamp, delta) {
        moveTowardGoal();
      }

      function setGoal() {
        while (true) {
          // Set distance
          var distance = Math.random() / 3;
          // Set a goal
          var angle = Math.random() * Math.PI * 2;

          self.gx = self.x + Math.sin(angle) * distance;
          self.gy = self.y + Math.cos(angle) * distance;

          if (self.gx <= 1 && self.gy <= 1 && self.gx >= 0 && self.gy >= 0) {
            break;
          }
        }

        // Set steps
        steps = Math.round(20 + Math.random() * 30);

        // Set speed
        // var speed = distance / steps;
        self.vx = (self.gx - self.x) / steps;
        self.vy = (self.gy - self.y) / steps;
      }

      function moveTowardGoal() {
        if (steps <= 0) setGoal();

        var newx = self.x + self.vx;
        var newy = self.y + self.vy;
        var toMove = checkMovement(newx, newy);
        if (toMove === true) {
          self.x = newx;
          self.y = newy;
        }
        steps--;
      }

      function getSelf() {
        return self;
      }

      function getRenderX(renderer) {
        var squeezeFactor = (self.y / 2 + 0.5);
        var squeezed = (self.x - 0.5) * squeezeFactor + 0.5;
        return squeezed * renderer.getWidth() - 40;
      }

      function getRenderHeight(renderer) {
        return ((self.y / 2) + 0.5) * self.size;
      }

      function getRenderY(renderer) {
        var renderHeight = getRenderHeight(renderer);
        var renderY = (self.y * (0.5 * renderer.getHeight()) + (0.5 * renderer.getHeight()));
        renderY = renderY - renderHeight;
        renderY = renderY + (renderHeight / 10);
        return renderY;
      }
    };
    return initializer();
  }

  // Exports
  module.exports = {
    initialize: initialize
  };
})();
