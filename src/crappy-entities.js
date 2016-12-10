(function() {
  var _ = require('lodash');
  var sprites = require('./crappy-sprites.js');
  var stats;

  var theGirl =
    { name: 'girl1',
      x: 500,
      y: 300,
      size: 400,
      happiness: 100,
      attractiveness: 40,
      curiosity: 100
    };

  var theBloon =
    { name: 'bloon',
      x: 250,
      y: 200,
      size: 200,
      attractiveness: 40
    };

  var theBear =
    { name: 'bear',
      x: 55,
      y: 450,
      size: 150,
      attractiveness: 20
    };

  var theRoom =
    { happiness: 0,
      people: [theGirl],
      items: [theBloon, theBear],
      addItems: (items) => {
        theRoom.items = theRoom.items.concat(items);
      },
      addPeople: (people) => {
        theRoom.people = theRoom.people.concat(people);
      },
      remove: (targets) => {
        theRoom.people = _.difference(theRoom.people, targets);
        theRoom.items = _.difference(theRoom.items, targets);
      },
      attractivenes: () => {
        var total = 0;
        theRoom.people.forEach((p) => {
          total += p.attractivenss;
        });
        theRoom.items.forEach((i) => {
          total += i.attractiveness;
        });
        return total;
      }
    };

  function initialize(canvasElement, incomingStats) {
    sprites.initialize(canvasElement);
    stats = incomingStats;
  }

  function render(timestamp, delta) {
    sprites.update([{ name: 'crappy-room', x: 25, y: 10, size: 900 }].concat(theRoom.people).concat(theRoom.items));
    sprites.draw();
    sprites.clearClicks();
    stats.draw(entities.theRoom);
  }

  module.exports = {
    render: render,
    initialize: initialize
  };
})();
