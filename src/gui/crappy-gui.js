(function() {
  var $ = require('./lol-jquery.js');
  var pause = () => { console.log('No pause function registered'); };

  var entities;

  var enticementView;
  var enticementDesc;
  var pausedView;
  var selectedItem;
  var shopItems;
  var shopShown = false;;

  function consumeAll() {
    entities.consumeAll();
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
    shopShown = show;
    if (show) {
      $.removeClass(enticementView, 'hidden');
    } else {
      $.addClass(enticementView, 'hidden');
    }
  }

  function initialize(ents) {
    entities = ents;

    shopItems = [
      { name: 'buy-plant',
        description: 'Back when YOU were human, you remember vaguely enjoying house plants.',
        action: entities.addPlant,
        price: 5
      },
      { name: 'buy-bear',
        description: 'Nothing says "This room is totally safe" like a cuddly teddy!',
        action: entities.addBear,
        price: 10
      },
      { name: 'buy-disco',
        description: 'It\'s not a party in your tummy without one of these.',
        action: entities.addDisco,
        price: 25
      },
      { name: 'buy-bloon',
        description: 'The bloons aren\'t even really for the humans, are they?',
        action: entities.addBloon,
        price: 50
      }];

    if (pausedView) return;
    document.getElementById('consume-all-button')
            .addEventListener('click', (e) => consumeAll(e));
    document.getElementById('pause-game-button')
            .addEventListener('click', (e) => pause());
    document.getElementById('purchase-enticement-button')
            .addEventListener('click', (e) => showShop(!shopShown));
    document.getElementById('close-enticement-button')
            .addEventListener('click', (e) => showShop(false));
    document.getElementById('purchase-selected-enticement')
            .addEventListener('click', (e) => {
              if (entities.attemptPayment(selectedItem.price)) {
                selectedItem.action();
                showShop(false);
              } else {
                // Todo, add feedback
              }
            });

    pausedView = document.getElementById('paused-view');
    enticementView = document.getElementById('enticement-view');
    enticementDesc = document.getElementById('enticement-description');

    selectedItem = shopItems[0];
    $.addClass(document.getElementById(selectedItem.name), 'enticement-activated');
    enticementDesc.innerHTML = selectedItem.description;

    shopItems.forEach((item) => {
      item.element = document.getElementById(item.name);
      item.element.addEventListener('mouseover', (e) => { enticementDesc.innerHTML = item.description; });
      item.element.addEventListener('mouseout', (e) => { enticementDesc.innerHTML = selectedItem.description; });
      item.element.addEventListener('click', (e) => {
        $.removeClass(selectedItem.element, 'enticement-activated');
        $.addClass(item.element, 'enticement-activated');
        selectedItem = item;
      });
    });
  }

  module.exports = {
    initialize: initialize,
    setPause: setPause,
    showPaused: showPaused,
    showShop: showShop
  };
})();
