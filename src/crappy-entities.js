(function() {
  var _ = require('lodash');
  var bloonBuilder = require('./entities/bloon.js');
  var roomBuilder = require('./entities/room.js');
  var goerBuilder = require('./entities/party-goer.js');
  var doorBuilder = require('./entities/door.js');
  var bearBuilder = require('./entities/bear.js');
  var renderer = require('./rendering.js');
  var stats;
  var width;
  var entities = [];
  var gameState = {};

  function initialize(canvasElement, incomingStats) {
    width = canvasElement.width;
    height = canvasElement.height;

    renderer.initialize(canvasElement);
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

    bloon.setX(100);
    bloon.setY(250);

    bear.setX(800);
    bear.setY(800);
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
    return a.getZ() - b.getZ();
  }

  function updateGameState() {
    gameState.happiness = entities.map(e => {
      return e.getHappiness ? e.getHappiness() : 0;
    }).reduce((acc, val) => acc + val, 0);

    gameState.peopleCount = entities.filter(e => {
      return e.isPerson ? true : false;
    }).length;

    gameState.enticementCount = entities.filter(e => {
      return e.isEnticement ? true : false;
    }).length;

    stats.draw(gameState);
  }

  module.exports = {
    update: update,
    initialize: initialize
  };
})();
