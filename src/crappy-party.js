(() => {
  var dude1Builder = require('./entities/goers/dude1.js');
  var girl1Builder = require('./entities/goers/girl1.js');
  var config = require('./configuration.js');
  var gameState = require('./crappy-state.js');

  function rollGoer() {
    var roll = Math.random();
    var irresistibility = (gameState.getEnticingness() / config.irresistableEnticingness);
    var required = config.basePartyGoerProbability + irresistibility;
    console.log(roll + " out of " + required);
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

  module.exports = {
    getPartyGoer: getPartyGoer,
    rollGoer: rollGoer
  };
})();
