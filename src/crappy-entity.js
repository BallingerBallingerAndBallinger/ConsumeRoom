(function() {
  // Includes
  var _ = require('lodash');

  function initialize(canvasElement, moveMethod) {
    var initializer = () => {
      var self = {};
      var context = canvasElement.getContext('2d');
      return {
        render: render,
        move: genericMove(moveMethod)
      };

      function genericMove(moveMethod) {
        return (deltaX, deltaY) => {
          moveMethod(self, deltaX, deltaY);
        };
      }

      function render(timestamp, delta) {
        context; // Is used somehow.
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
