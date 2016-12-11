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
  var entities = [];

  function initialize(canvasElement) {
    renderer.initialize(canvasElement);
    gui.initialize(canvasElement);
    gui.setConsumeAll(consumeAll);

    var bloon = bloonBuilder.initialize(renderer, logMove, checkMovement);
    var bear = bearBuilder.initialize(renderer, logMove, checkMovement);
    entities = [
      roomBuilder.initialize(renderer),
      bloon,
      bear,
      doorBuilder.initialize(renderer)
    ];
  }

  function logMove(entity, x, y) {
    console.log('Moving: ' + entity.name + ': (' + x + ', ' + y + ')');
  }

  function checkMovement(x, y) {
    if (x < 0) {
      return false;
    }

    if (x > 1) {
      return false;
    }

    if (y < 0) {
      return false;
    }

    if (y > 1) {
      return false;
    }

    return true;
  }

  function update(timestamp, delta) {
    if (Math.random() < 0.01) {
      introducePartygoer();
    }
    gameState.fondleEntities(entities);

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

  function introducePartygoer() {
    var goer = goerBuilder.initialize(renderer, logMove, checkMovement);
    goer.setX(1);
    goer.setY(0);
    entities.push(goer);
  }

  module.exports = {
    update: update,
    initialize: initialize
  };
})();
