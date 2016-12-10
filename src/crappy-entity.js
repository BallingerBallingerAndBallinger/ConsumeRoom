(function() {
  // Includes
  var _ = require('lodash');

  function initialize(canvasElement, moveMethod) {
    var initializer = () => {
      var self = {name: 'generic', x: 1, y: 2};
      var context = canvasElement.getContext('2d');
      return {
        update: update
      };

      function update(timestamp, delta) {
        context; // To be used in here
        moveMethod(self, 10, 10);
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
