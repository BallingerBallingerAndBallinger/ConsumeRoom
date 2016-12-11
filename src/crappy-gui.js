(function() {
  var consumeAll = () => { console.log('No consume function registered'); };
  var pause = () => { console.log('No pause function registered'); };

  function setConsumeAll(consumeFn) {
    consumeAll = consumeFn;
  }

  function setPause(pauseFn) {
    pause = pauseFn;
  }

  function initialize() {
    document.getElementById('consume-all-button')
            .addEventListener('click', (e) => consumeAll(e));
    document.getElementById('pause-game-button')
            .addEventListener('click', (e) => pause());
  }

  module.exports = {
    initialize: initialize,
    setConsumeAll: setConsumeAll,
    setPause: setPause
  };
})();
