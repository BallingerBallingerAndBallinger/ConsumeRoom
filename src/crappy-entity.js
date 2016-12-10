(function() {
  // Includes
  var _ = require('lodash');

  function initialize(canvasElement, moveMethod) {
    var entity = () => {
      var entity = {};
      var context = canvasElement.getContext('2d');
      return {
        render: genericRender(context, entity),
        move: genericMove(entity, moveMethod)
      };
    };

    return entity();
  }

  function genericRender(context, entity) {
    return (timestamp, delta) => {
      render(context, entity, timestamp, delta);
    };
  }

  function genericMove(entity, moveMethod) {
    return (deltaX, deltaY) => {
      moveMethod(entity, deltaX, deltaY);
    };
  }

  function render(context, entity, deltaX, deltaY) {
    console.log("We're totally rendering an entity right now");
  }

  // Exports
  module.exports = {
    initialize: initialize
  };
})();
