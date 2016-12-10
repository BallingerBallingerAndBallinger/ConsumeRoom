(function() {
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

  module.exports = {
    theRoom: theRoom
  };
})();
