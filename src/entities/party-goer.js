(() => {
  var entityBase = require('../crappy-entity.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var render = renderer;
      var steps = 0;
      var stepsGenerator = () => Math.round(10 + Math.random() * 25);
      var goalCallback;
      var stayer = false;

      var self = entity.getSelf();
      self.name = 'crappy-party-dude';
      self.size = 400;

      var goer = Object.assign({}, entity);
      goer.update = update;
      goer.draw = draw;
      goer.setGoal = setGoal;
      goer.isPerson = true;
      goer.setStepsGenerator = setStepsGenerator;
      goer.setSteps = setSteps;
      goer.getSteps = getSteps;
      goer.hasGoalCallback = hasGoalCallback;
      goer.setStayer = setStayer;
      goer.isStayer = () => stayer;
      return goer;

      function update(timestamp, delta) {
        entity.update(timestamp, delta);
        moveTowardGoal();
        draw(timestamp, delta);
      }

      function draw(timestamp, delta) {
        render.image(entity.getRenderX(renderer) - 50, entity.getRenderY(renderer), self.name, '', entity.getRenderHeight(renderer));
      }

      function setSteps(newSteps) {
        steps = newSteps;
        self.vx = (self.gx - self.x) / steps;
        self.vy = (self.gy - self.y) / steps;
      }

      function getSteps() {
        return steps;
      }

      function setStayer(newStayer) {
        stayer = newStayer;
      }

      function hasGoalCallback() {
        return goalCallback ? true : false;
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
        steps = stepsGenerator();

        // Set speed
        // var speed = distance / steps;
        self.vx = (self.gx - self.x) / steps;
        self.vy = (self.gy - self.y) / steps;
      }

      function setStepsGenerator(newGenerator) {
        stepsGenerator = newGenerator;
      }

      function moveTowardGoal() {
        if (steps <= 0) {
          if (goalCallback) {
            // Now the callback can set a new goal
            var cb = goalCallback;
            goalCallback = undefined;
            cb();
          } else {
            setGoal();
          }
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
