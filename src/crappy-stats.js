(function() {
  var displays;

  function draw(room) {
    displays.forEach((display) => {
      display.element.innerHTML = display.value(room);
    });
  }

  function initialize() {
    displays = [
      { element: document.getElementById('room-happiness'),
        value: (room) => { return room.getHappiness(); }
      },
      { element: document.getElementById('people-count'),
        value: (room) => { return room.getPeopleCount(); }
      },
      { element: document.getElementById('item-count'),
        value: (room) => { return room.getEnticementCount(); }
      }
    ];
  }

  module.exports = {
    initialize: initialize,
    draw: draw
  };
})();
