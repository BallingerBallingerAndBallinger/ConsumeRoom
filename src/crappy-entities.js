(function() {
  var _ = require('lodash');
  var bloonBuilder = require('./entities/items/bloon.js');
  var roomBuilder = require('./entities/room.js');
  var girl1Builder = require('./entities/goers/girl1.js');
  var goerBuilder = require('./entities/party-goer.js');
  var doorBuilder = require('./entities/door.js');
  var windowBuilder = require('./entities/window.js');
  var bearBuilder = require('./entities/items/bear.js');
  var config = require('./configuration.js');
  var renderer = require('./rendering.js');
  var gameState = require('./crappy-state.js');
  var click = require('./crappy-click-handler.js');
  var movementHandler = require('./crappy-movement-handler.js');
  var entities = [];
  var eating;
  var room;
  var clickEvent;

  function initialize(canvasElement) {
    renderer.initialize(canvasElement);
    movementHandler.initialize();
    click.initialize(canvasElement);
    click.register((e) => { clickEvent = e; });

    var bloon = bloonBuilder.initialize(renderer, movementHandler);
    var window = windowBuilder.initialize(renderer);

    room = roomBuilder.initialize(renderer);
    entities = [
      window,
      room,
      bloon
    ];
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
    if (clickEvent) {
      var coords = renderer.transformEventToCoords(clickEvent);
      for (var i = entities.length - 1; i >= 0; i--) {
        var entity = entities[i];
        if (entity.handleClick) {
          if (entity.handleClick(coords.x, coords.y)) break;
        }
      }
      clickEvent = undefined;
    }
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

  function addBear() {
    var bear = bearBuilder.initialize(renderer, movementHandler);
    bear.setY(Math.random());
    entities.push(bear);
    gameState.bankHappiness(-1);
  }

  function introducePartygoer() {
    var goer;
    if (Math.random() < 0.5) {
      goer = goerBuilder.initialize(renderer, movementHandler);
    } else {
      goer = girl1Builder.initialize(renderer, movementHandler);
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
    consumeAll: consumeAll,
    addBear: addBear,
    update: update,
    initialize: initialize
  };
})();
