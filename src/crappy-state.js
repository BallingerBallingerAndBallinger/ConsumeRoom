(() => {
  var peopleCount;
  var enticementCount;
  var enticingness;
  var banked;

  function initialize() {
    peopleCount = 0;
    enticementCount = 0;
    enticingness = 0;
    banked = 10;
  }

  function fondleEntities(entities) {
    enticingness = entities.map(e => {
      return e.getHappiness ? e.getHappiness() : 0;
    }).reduce((acc, val) => acc + val, 0);

    peopleCount = entities.filter(e => {
      return e.isPerson ? true : false;
    }).length;

    enticementCount = entities.filter(e => {
      return e.isEnticement ? true : false;
    }).length;
  }

  function bankHappiness(hopesAndDreams) {
    banked += hopesAndDreams;
  }

  module.exports = {
    initialize: initialize,
    getHappiness: () => banked,
    getPeopleCount: () => peopleCount,
    getEnticementCount: () => enticementCount,
    getEnticingness: () => enticingness,
    fondleEntities: fondleEntities,
    bankHappiness: bankHappiness
  };
})();
