(function() {
  var $ = require('./lol-jquery.js');
  var pause = () => { console.log('No pause function registered'); };

  var entities;

  var pausedView;

  function consumeAll() {
    entities.consumeAll();
  }

  function addBear() {
    entities.addBear();
  }

  function setPause(pauseFn) {
    pause = (paused) => {
      pauseFn(paused);
    };
  }

  function showPaused(show) {
    if (show) {
      $.removeClass(pausedView, 'hidden');
    } else {
      $.addClass(pausedView, 'hidden');
    }
  }

  function initialize(ents) {
    entities = ents;

    if (pausedView) return;
    document.getElementById('consume-all-button')
            .addEventListener('click', (e) => consumeAll(e));
    document.getElementById('pause-game-button')
            .addEventListener('click', (e) => pause());
    document.getElementById('purchase-enticement-button')
            .addEventListener('click', (e) => addBear(e));

    pausedView = document.getElementById('paused-view');
  }

  module.exports = {
    initialize: initialize,
    setPause: setPause,
    showPaused: showPaused
  };
})();
