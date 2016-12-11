(() => {
  var entityBase = require('../crappy-entity.js');
  var partyGoer = require('./goers/girl1.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);

      var self = { name: 'window', x: 0, y: -2 };

      var pacers = [];
      for (var i = 0; i < 30; i++) {
        var pacer = partyGoer.initialize(renderer, { check: () => true });

        pacer.setX(Math.random());
        pacer.setY(-0.03);
        pacer.setStepsGenerator(() => 60 + Math.random() * 60);

        startPacing(pacer);
        pacers.push(pacer);
      }

      var room = Object.assign({}, entity);
      room.update = update;
      room.getX = getX;
      room.getY = getY;
      return room;

      function update(timestamp, delta) {
        pacers.forEach((pacer) => {
          pacer.update(timestamp, delta);
        });
      }

      function getX() {
        return self.x;
      }

      function getY() {
        return self.y;
      }

      function startPacing(pacer) {
        var goingLeft = (Math.random() > 0.5);
        reverseGoal();

        function reverseGoal() {
          goingLeft = !goingLeft;
          if (goingLeft) {
            pacer.setGoal(1, -0.03, reverseGoal);
          } else {
            pacer.setGoal(0, -0.03, reverseGoal);
          }
        }
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
