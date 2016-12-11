(() => {
  var registered = [];

  function initialize(canvasElement) {
    canvasElement.addEventListener('click', (e) => registered.forEach(h => h(e)));
  }

  function register(handler) {
    registered.push(handler);
  }

  function unregister(handler) {
    registered = registered.filter((h) => h === handler);
  }

  module.exports = {
    initialize: initialize,
    register: register,
    unregister: unregister
  };
})();
