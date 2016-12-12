(function() {
  var $ = require('./lol-jquery.js');
  var pause = () => { console.log('No pause function registered'); };

  var entities;

  var enticementView;
  var enticementDesc;
  var enticementBuy;
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

  function showShop(show) {
    if (show) {
      $.removeClass(enticementView, 'hidden');
    } else {
      $.addClass(enticementView, 'hidden');
    }
  }

  function showDescription(show) {
    if (show) {
      $.removeClass(enticementDesc, 'hidden');
    } else {
      $.addClass(enticementDesc, 'hidden');
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
            .addEventListener('click', (e) => showShop(true));
    document.getElementById('close-enticement-button')
            .addEventListener('click', (e) => showShop(false));

    document.getElementById('buy-bear')
            .addEventListener('mouseover', (e) => showDescription(true));
    document.getElementById('buy-bear')
            .addEventListener('mouseout', (e) => showDescription(false));

    pausedView = document.getElementById('paused-view');
    enticementView = document.getElementById('enticement-view');
    enticementDesc = document.getElementById('enticement-description-area');
    enticementBuy = document.getElementById('purchase-selected-enticement');
  }

  module.exports = {
    initialize: initialize,
    setPause: setPause,
    showPaused: showPaused,
    showShop: showShop
  };
})();
