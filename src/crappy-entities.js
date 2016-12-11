(function() {
  var _ = require('lodash');
  var bloonBuilder = require('./entities/bloon.js');
  var roomBuilder = require('./entities/room.js');
  var goerBuilder = require('./entities/party-goer.js');
  var doorBuilder = require('./entities/door.js');
  var bearBuilder = require('./entities/bear.js');
  var renderer = require('./rendering.js');
  var gui = require('./crappy-gui.js');
  var gameState = require('./crappy-state.js');
  var stats;
  var width;
  var entities = [];

  function initialize(canvasElement, incomingStats) {
    width = canvasElement.width;
    height = canvasElement.height;

    renderer.initialize(canvasElement);
    gui.initialize(canvasElement);
    gui.setConsumeAll(consumeAll);

    stats = incomingStats;
    stats.initialize();

    var bloon = bloonBuilder.initialize(renderer, logMove, checkMovement);
    var bear = bearBuilder.initialize(renderer, logMove, checkMovement);
    entities = [
      roomBuilder.initialize(renderer),
      bloon,
      bear,
      doorBuilder.initialize(renderer),
      goerBuilder.initialize(renderer, logMove, checkMovement),
      goerBuilder.initialize(renderer, logMove, checkMovement),
      goerBuilder.initialize(renderer, logMove, checkMovement),
      goerBuilder.initialize(renderer, logMove, checkMovement)
    ];

    for (var i = 0; i < 100; i++) {
      entities.push(goerBuilder.initialize(renderer, logMove, checkMovement));
    }
  }

  function logMove(entity, x, y) {
    console.log('Moving: ' + entity.name + ': (' + x + ', ' + y + ')');
  }

  function checkMovement(x, y) {
    if (x < 0) {
      return false;
    }

    if (x > width) {
      return false;
    }

    return true;
  }

  function update(timestamp, delta) {
    updateGameState();
    renderer.clear();
    entities.sort(compareEntities);
    entities.forEach(e => e.update(timestamp, delta));
  }

  function compareEntities(a, b) {
    return a.getY() - b.getY();
  }

  function consumeAll() {
    var originalCount = entities.length;
    entities = entities.filter(e => {
      return e.isPerson ? false : true;
    });
    gameState.bankHappiness(originalCount - entities.length);
  }

  function updateGameState() {
    gameState.fondleEntities(entities);
    stats.draw(gameState);
  }

  module.exports = {
    update: update,
    initialize: initialize
  };
})();
