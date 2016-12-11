(() => {
  var happiness = 0;
  var peopleCount = 0;
  var enticementCount = 0;
  var enticingness = 0;

  var banked = 0;

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
    getHappiness: () => banked,
    getPeopleCount: () => peopleCount,
    getEnticementCount: () => enticementCount,
    getEnticingness: () => enticingness,
    fondleEntities: fondleEntities,
    bankHappiness: bankHappiness
  };
})();
