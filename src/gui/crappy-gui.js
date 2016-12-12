(function() {
  var pause = () => { console.log('No pause function registered'); };

  var entities;

  var pausedView;
  var gameOverView;

  function consumeAll() {
    entities.consumeAll();
  }

  function addBear(){
    entities.addBear();
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

  function initialize(ents) {
    entities = ents;

    document.getElementById('consume-all-button')
            .addEventListener('click', (e) => consumeAll(e));
    document.getElementById('pause-game-button')
            .addEventListener('click', (e) => pause());
    document.getElementById('purchase-enticement-button')
            .addEventListener('click', (e) => addBear(e));

    pausedView = document.getElementById('paused-view');
    gameOverView = document.getElementById('game-over');
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
    setPause: setPause,
    showPaused: showPaused
  };
})();