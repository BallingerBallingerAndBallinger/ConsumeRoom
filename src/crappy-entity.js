(function() {
  // Includes
  var _ = require('lodash');

  function initialize(renderer, moveMethod) {
    var initializer = () => {
      var self = {name: 'generic', x: 1, y: 2};
      var render = renderer;
      return {
        update: update
      };

      function update(timestamp, delta) {
        moveMethod(self, 10, 10);
        render.circle(self.x, self.y, 20, 'black', 'red');
        console.log("We're totally rendering an entity right now");
      }
    };
    return initializer();
  }

  // Exports
  module.exports = {
    initialize: initialize
  };
})();
