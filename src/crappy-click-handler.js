(() => {
  var registered = [];
  var initialized = false;

  function initialize(canvasElement) {
    registered = [];
    if (initialized) return;
    initialized = true;
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
