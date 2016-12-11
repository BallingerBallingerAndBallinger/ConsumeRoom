(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;
      var steps = 0;
      var goalCallback;

      var self = entity.getSelf();
      self.name = 'crappy-party-dude';
      self.size = 400;

      var goer = Object.assign({}, entity);
      goer.update = update;
      goer.draw = draw;
      goer.setGoal = setGoal;
      goer.isPerson = true;
      return goer;

      function update(timestamp, delta) {
        entity.update(timestamp, delta);
        draw(timestamp, delta);
      }

      function draw(timestamp, delta) {
        render.image(entity.getRenderX(renderer), entity.getRenderY(renderer), self.name, '', entity.getRenderHeight(renderer));
      }

      function setGoal(x, y, callback) {
        goalCallback = callback;
        if (x !== undefined && y !== undefined) {
          self.gx = x;
          self.gy = y;
        } else {
          while (true) {
            // Set distance
            var distance = Math.random() / 3;
            // Set a goal
            var angle = Math.random() * Math.PI * 2;

            self.gx = self.x + Math.sin(angle) * distance;
            self.gy = self.y + Math.cos(angle) * distance;

            if (movementHandler.check(self.gx, self.gy)) {
              break;
            }
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
        if (steps <= 0) {
          if (goalCallback) {
            goalCallback();
            goalCallback = undefined;
          }
          setGoal();
        }

        var newx = self.x + self.vx;
        var newy = self.y + self.vy;
        var toMove = movementHandler.check(newx, newy);
        if (toMove === true) {
          self.x = newx;
          self.y = newy;
        }
        steps--;
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
