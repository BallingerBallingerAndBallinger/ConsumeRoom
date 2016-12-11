(function() {
  var consumeAll = () => { console.log('No consume function registered'); };
  var pause = () => { console.log('No pause function registered'); };

  var pausedView;

  function setConsumeAll(consumeFn) {
    consumeAll = consumeFn;
  }
  
  function setPause(pauseFn) {
    pause = (paused) => {
      pauseFn(paused);
    };
  }

  function showPaused(show) {
    if (show) {
      removeClass(pausedView, 'hidden');
    } else {
      addClass(pausedView, 'hidden');
    }
  }

  function initialize() {
    document.getElementById('consume-all-button')
            .addEventListener('click', (e) => consumeAll(e));
    document.getElementById('pause-game-button')
            .addEventListener('click', (e) => pause());

    pausedView = document.getElementById('paused-view');
  }

  function addClass(element, klass) {
    var classes = element.className.match(/(^| ).+?($| )/g);
    classes = classes.map(s => s.trim());
    if (classes.includes(klass)) return;
    element.className += ' ' + klass;
  }

  function removeClass(element, klass) {
    var classes = element.className.match(/(^| ).+?($| )/g);
    classes = classes.map(s => s.trim());
    element.className = classes.filter((k) => k !== klass).join(' ');
  }

  module.exports = {
    initialize: initialize,
    setConsumeAll: setConsumeAll,
    setPause: setPause,
    showPaused: showPaused
  };
})();
