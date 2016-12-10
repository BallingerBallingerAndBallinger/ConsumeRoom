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
        value: (room) => {
          var happiness = 0;
          room.people.forEach((person) => {
            happiness += person.happiness;
          });
          return happiness;
        }
      },
      { element: document.getElementById('people-count'),
        value: (room) => { return room.people.length; }
      },
      { element: document.getElementById('item-count'),
        value: (room) => { return room.items.length; }
      }
    ];
  }

  module.exports = {
    initialize: initialize,
    draw: draw
  };
})();
