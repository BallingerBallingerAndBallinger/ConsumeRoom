(() => {
  var dude1Builder = require('./entities/goers/dude1.js');
  var girl1Builder = require('./entities/goers/girl1.js');

  function getPartyGoer(renderer, movementHandler) {
    var goerBuilders = [
      () => { return dude1Builder.initialize(renderer, movementHandler); },
      () => { return girl1Builder.initialize(renderer, movementHandler); }
   ];

    var selection = Math.floor(Math.random() * goerBuilders.length);
    var goer = goerBuilders[selection]();

    return goer;
  }

  module.exports = {
    getPartyGoer: getPartyGoer
  };
})();
