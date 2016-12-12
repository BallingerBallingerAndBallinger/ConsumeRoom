(function() {
  var _ = require('lodash');
  var bloonBuilder = require('./entities/items/bloon.js');
  var roomBuilder = require('./entities/room.js');
  var doorBuilder = require('./entities/door.js');
  var windowBuilder = require('./entities/window.js');
  var bearBuilder = require('./entities/items/bear.js');
  var party = require('./crappy-party.js');
  var discoBuilder = require('./entities/items/disco.js');
  var config = require('./configuration.js');
  var renderer = require('./rendering.js');
  var gameState = require('./crappy-state.js');
  var click = require('./crappy-click-handler.js');
  var movementHandler = require('./crappy-movement-handler.js');
  var entities = [];
  var eating;
  var room;
  var clickEvent;
  var timeout;

  function initialize(canvasElement) {
    renderer.initialize(canvasElement);
    renderer.audio('sound');

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
      if (party.rollGoer()) {
        introducePartygoer();
      }

      if (party.rollLeaver()) {
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

  function gameOver() {
    renderer.stopAudio('sound');
    if (timeout) clearTimeout(timeout);
    eating = false;
  }

  function consumeAll() {
    if (eating) return;
    eating = true;
    renderer.stopAudio('sound');
    renderer.audio('eat');

    var people = entities.filter(e => {
      return e.isPerson ? true : false;
    });
    var originalCount = people.length;

    people.forEach(p => p.setGoal(0.5, 0.5, () => {
      if (p.eaten) {
        p.eaten();
      } else {
        entities = _.difference(entities, [p]);
      }
    }));

    timeout = setTimeout(() => {
      entities = _.difference(entities, people);
      gameState.bankHappiness(originalCount);
      renderer.audio('sound');
      eating = false;
      timeout = undefined;
    }, config.eatSoundTime);
  }

  function attemptPayment(amount) {
    if (gameState.getHappiness() > amount) {
      gameState.bankHappiness(-amount);
      return true;
    }

    return false;
  }
  function addBear() {
    var bear = bearBuilder.initialize(renderer, movementHandler);
    entities.push(bear);
  }
  function addDisco() {
    var disco = discoBuilder.initialize(renderer, movementHandler);
    entities.push(disco);
  }
  function addPlant() {
    var plant = discoBuilder.initialize(renderer, movementHandler);
    entities.push(plant);
  }
  function addBloon() {
    var bloon = bloonBuilder.initialize(renderer, movementHandler);
    entities.push(bloon);
  }

  function introducePartygoer() {
    var goer = party.getPartyGoer(renderer, movementHandler);

    goer.setX(0.9);
    goer.setY(0);
    entities.push(goer);
  }

  function partyGoerWantsToLeave() {
    var people = entities.filter((e) => e.isPerson) || [];
    var leaver = people[Math.floor(Math.random() * people.length)];
    if (leaver === undefined) return;

    leaver.setGoal(0.9, 0, () => {
      if (eating) return;
      entities = entities.filter(e => e !== leaver);
    });
  }

  module.exports = {
    gameOver: gameOver,
    consumeAll: consumeAll,
    addBear: addBear,
    addDisco: addDisco,
    addPlant: addPlant,
    addBloon: addBloon,
    attemptPayment: attemptPayment,
    update: update,
    initialize: initialize
  };
})();
