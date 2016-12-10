(function() {
  var _ = require('lodash');
  var bloonBuilder = require('./entities/bloon.js');
  var roomBuilder = require('./entities/room.js');
  var goerBuilder = require('./entities/party-goer.js');
  var doorBuilder = require('./entities/door.js');
  var bearBuilder = require('./entities/bear.js');
  var renderer = require('./rendering.js');
  var stats;
  var width;
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
    width = canvasElement.width;
    height = canvasElement.height;

    renderer.initialize(canvasElement);
    stats = incomingStats;
    stats.initialize(theRoom);
    var bloon = bloonBuilder.initialize(renderer, logMove, checkMovement);
    var bear = bearBuilder.initialize(renderer, logMove, checkMovement);
    entities = [
      roomBuilder.initialize(renderer),
      bloon,
      bear,
      doorBuilder.initialize(renderer),
      goerBuilder.initialize(renderer, logMove, checkMovement),
      goerBuilder.initialize(renderer, logMove, checkMovement),
      goerBuilder.initialize(renderer, logMove, checkMovement),
      goerBuilder.initialize(renderer, logMove, checkMovement)
    ];

    bloon.setX(100);
    bloon.setY(250);

    bear.setX(800);
    bear.setY(800);
  }

  function logMove(entity, x, y) {
    console.log('Moving: ' + entity.name + ': (' + x + ', ' + y + ')');
  }

  function checkMovement(x, y) {
    if (x < 0) {
      return false;
    }

    if (x > width) {
      return false;
    }

    return true;
  }

  function update(timestamp, delta) {
    renderer.clear();
    entities.forEach(e => e.update(timestamp, delta));
  }

  module.exports = {
    update: update,
    initialize: initialize
  };
})();
