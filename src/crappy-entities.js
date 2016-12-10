(function() {
  var _ = require('lodash');
  var sprites = require('./crappy-sprites.js');
  var entityBuilder = require('./crappy-entity.js');
  var stats;
  var entities = [];

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
    stats.initialize(theRoom);
    entities = [
      entityBuilder.initialize(canvasElement, (entity, x, y) => console.log('Move A ' + x + ', ' + y)),
      entityBuilder.initialize(canvasElement, (entity, x, y) => console.log('Move B ' + x + ', ' + y))
    ];
  }

  function render(timestamp, delta) {
    entities.forEach(e => e.move(1, 2));
    entities.forEach(e => e.render(timestamp, delta));
  }

  module.exports = {
    render: render,
    initialize: initialize
  };
})();
