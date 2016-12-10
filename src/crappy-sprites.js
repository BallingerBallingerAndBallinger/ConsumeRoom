(function() {
  var sprites = [];
  var clicked = [];
  var width;
  var height;
  var context;

  function initialize(canvasElement) {
    canvasElement.addEventListener('click', clickHappened);
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

  function clickHappened(clickEvent) {
    var coords = transformCoords(clickEvent);
    var encountered = sprites.filter((sprite) => isInsideSprite(sprite, coords.x, coords.y)).slice(0);
    clicked = clicked.concat(encountered);
  }

  function isInsideSprite(sprite, x, y) {
    return sprite.x < x &&
           sprite.y < y &&
           sprite.x + sprite.size > x &&
           sprite.y + sprite.size > y;
  }

  function getClicks() {
    return clicked;
  }

  function clearClicks() {
    clicked = [];
  }

  function transformCoords(event) {
    var rect = event.target.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (width / rect.width),
      y: (event.clientY - rect.top) * (height / rect.height)
    };
  }

  module.exports = {
    draw: draw,
    update: update,
    initialize: initialize,
    getClicks: getClicks,
    clearClicks: clearClicks
  };
})();
