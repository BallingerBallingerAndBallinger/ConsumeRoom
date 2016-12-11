(function() {
  var displays;

  function draw(gameState) {
    displays.forEach((display) => {
      display.element.innerHTML = display.value(gameState);
    });
  }

  function initialize() {
    displays = [
      { element: document.getElementById('room-happiness'),
        value: (gameState) => { return gameState.getHappiness(); }
      },
      { element: document.getElementById('room-enticingness'),
        value: (gameState) => { return gameState.getEnticingness(); }
      },
      { element: document.getElementById('people-count'),
        value: (gameState) => { return gameState.getPeopleCount(); }
      },
      { element: document.getElementById('item-count'),
        value: (gameState) => { return gameState.getEnticementCount(); }
      }
    ];
  }

  module.exports = {
    initialize: initialize,
    draw: draw
  };
})();
