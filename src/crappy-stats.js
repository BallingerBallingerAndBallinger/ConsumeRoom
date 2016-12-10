(function() {
  var displays;

  function draw(room) {
    displays.forEach((display) => {
      display.element.innerHTML = display.value(room);
    });
  }

  function initialize(room) {
    displays = [
      { element: document.getElementById('room-happiness'),
        value: (room) => { return room.happiness }
      },
      { element: document.getElementById('people-count'),
        value: (room) => { return room.peopleCount; }
      },
      { element: document.getElementById('item-count'),
        value: (room) => { return room.enticementCount; }
      }
    ];
  }

  module.exports = {
    initialize: initialize,
    draw: draw
  };
})();
