(function() {
  // Includes
  var _ = require('lodash');

  function initialize(renderer, moveMethod) {
    var initializer = () => {
      var self = {name: 'generic', x: 1, y: 2, vx: 0, vy: 0, gx: 0, gy: 0};
      var render = renderer;
      var steps;
      return {
        update: update
      };

      function update(timestamp, delta) {
        moveMethod(self, 10, 10);
        render.circle(self.x, self.y, 20, 'black', 'red');
        console.log("We're totally rendering an entity right now");
      }

      function setGoal() {

        // Set distance
        var distance = 10 + Math.Random() * 100;

        // Set a goal
        var angle = Math.Random() * Math.PI * 2;
        self.gx = Math.sin(angle) * distance;
        self.gy = Math.cos(angle) * distance;

        // Set steps
        steps = 2 + Math.Random() * 100;

        // Set speed
        var speed = distance / steps;
        self.vx = (self.x - self.gx) * speed;
        self.vy = (self.y - self.gy) * speed;

      }

      function moveTowardGoal() {

        if (steps == 0) setGoal();

        var newx = self.x+self.vx;
        var newy = self.y+self.vy;
        var toMove = checkMovement(newx, newy);
        if (toMove == true) {
          self.x = newx;
          self.y = newy;
          steps--;
        }

      }


    };
    return initializer();
  }

  // Exports
  module.exports = {
    initialize: initialize
  };
})();
