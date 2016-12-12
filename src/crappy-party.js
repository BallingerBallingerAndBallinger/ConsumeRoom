(() => {
  var dude1Builder = require('./entities/goers/dude1.js');
  var girl1Builder = require('./entities/goers/girl1.js');
  var config = require('./configuration.js');
  var gameState = require('./crappy-state.js');

  function rollGoer() {
    var roll = Math.random();
    var required = config.basePartyGoerProbability + irresistableness();
    if (roll < required) {
      return true;
    }
  }

  function rollLeaver() {
    var roll = Math.random();

    var softCap = irresistableness() * config.packedHouse;
    var people = gameState.getPeopleCount();
    var packedPenalty = people / softCap;
    var required = config.basePartyGoerLeavesProbability + packedPenalty;

    if (roll < required) {
      return true;
    }
  }

  function getPartyGoer(renderer, movementHandler) {
    var goerBuilders = [
      () => { return dude1Builder.initialize(renderer, movementHandler); },
      () => { return girl1Builder.initialize(renderer, movementHandler); } ];

    var selection = Math.floor(Math.random() * goerBuilders.length);
    var goer = goerBuilders[selection]();

    return goer;
  }

  function irresistableness() {
    var irresistability = (gameState.getEnticingness() / config.irresistableEnticingness);
    if (irresistability > 1) return 1;
    return irresistability;
  }

  module.exports = {
    getPartyGoer: getPartyGoer,
    rollGoer: rollGoer,
    rollLeaver: rollLeaver
  };
})();
