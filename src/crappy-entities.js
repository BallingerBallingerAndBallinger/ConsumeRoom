(function() {
  var _ = require('lodash');
  var bloonBuilder = require('./entities/bloon.js');
  var roomBuilder = require('./entities/room.js');
  var girl1Builder = require('./entities/girl1.js');
  var goerBuilder = require('./entities/party-goer.js');
  var doorBuilder = require('./entities/door.js');
  var bearBuilder = require('./entities/bear.js');
  var config = require('./configuration.js');
  var renderer = require('./rendering.js');
  var gui = require('./crappy-gui.js');
  var gameState = require('./crappy-state.js');
  var entities = [];
  var eating;
  var room;

  function initialize(canvasElement) {
    renderer.initialize(canvasElement);
    gui.setConsumeAll(consumeAll);

    var bloon = bloonBuilder.initialize(renderer, logMove, checkMovement);
    room = roomBuilder.initialize(renderer);
    entities = [
      room,
      bloon
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
    if (!eating) {
      if (Math.random() < config.basePartyGoerProbability) {
        introducePartygoer();
      }

      if (Math.random() < config.basePartyGoerLeavesProbability) {
        partyGoerWantsToLeave();
      }
    }

    room.setEating(eating);
    gameState.fondleEntities(entities);
    renderer.clear();
    entities.sort(compareEntities);
    entities.forEach(e => e.update(timestamp, delta));
  }

  function compareEntities(a, b) {
    return a.getY() - b.getY();
  }

  function consumeAll() {
    if (eating) return;
    eating = true;
    renderer.stopAudio('sound');
    renderer.audio('eat');

    var originalCount = entities.length;
    var people = entities.filter(e => {
      return e.isPerson ? true : false;
    });

    people.forEach(p => p.setGoal(0.5, 0.5, () => {
      if (p.eaten) {
        p.eaten();
      } else {
        entities = _.difference(entities, [p]);
      }
    }));

    setTimeout(() => {
      entities = _.difference(entities, people);
      gameState.bankHappiness(originalCount - entities.length);
      renderer.audio('sound');
      eating = false;
    }, config.eatSoundTime);
  }

  function introducePartygoer() {
    var goer;
    if (Math.random() < 0.5) {
      goer = goerBuilder.initialize(renderer, logMove, checkMovement);
    } else {
      goer = girl1Builder.initialize(renderer, logMove, checkMovement);
    }

    goer.setX(0.9);
    goer.setY(0);
    entities.push(goer);
    console.log(goer.getSelf().name + ' has arrived!');
  }

  function partyGoerWantsToLeave() {
    var people = entities.filter((e) => e.isPerson) || [];
    var leaver = people[Math.floor(Math.random() * people.length)];
    if (leaver === undefined) return;

    console.log(leaver.getSelf().name + ' is leaving!');
    leaver.setGoal(0.9, 0, () => {
      if (eating) return;
      entities = entities.filter(e => e !== leaver);
    });
  }

  module.exports = {
    update: update,
    initialize: initialize
  };
})();
