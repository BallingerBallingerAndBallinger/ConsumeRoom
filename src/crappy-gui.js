(function() {
  var consumeAll = () => { console.log('No consume function registered'); };

  function setConsumeAll(consumeFn) {
    consumeAll = consumeFn;
  }

  function initialize() {
    document.getElementById('consume-all-button')
            .addEventListener('click', (e) => consumeAll(e));
  }

  module.exports = {
    initialize: initialize,
    setConsumeAll: setConsumeAll
  };
})();
