(function() {
  var sprites;
  var width;
  var height;
  var context;

  function initialize(canvasElement) {
    context = canvasElement.getContext('2d');
    width = canvasElement.width;
    height = canvasElement.height;
    sprites = [];
  }

  function draw() {
    context.clearRect(0, 0, width, height);
    sprites.forEach((sprite) => {
      context.drawImage(document.getElementById(sprite.name), sprite.x, sprite.y, sprite.size, sprite.size);
    });
  }

  function update(newState) {
    sprites = newState;
  }

  module.exports = {
    draw: draw,
    update: update,
    initialize: initialize
  };
})();
