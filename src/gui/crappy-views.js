(() => {
  var $ = require('./lol-jquery.js');

  var viewIds = ['title-screen-view', 'quote-view', 'game-over-view'];
  var buttonIds = ['begin-game-button', 'continue-button', 'start-over-button'];
  var views;
  var buttons;

  function initialize() {
    views = viewIds.map(id => document.getElementById(id));
    buttons = buttonIds.map(id => document.getElementById(id));
  }

  function show(id) {
    views.map(v => $.addClass(v, 'hidden'));

    var idx = viewIds.indexOf(id);
    if (idx < 0) return;
    views.map(v => $.addClass(v, 'hidden'));
    $.removeClass(views[idx], 'hidden');
  }

  function wire(id, callback) {
    var idx = buttonIds.indexOf(id);
    if (idx < 0) return;

    buttons[idx].addEventListener('click', callback);
  }

  module.exports = {
    initialize: initialize,
    show: show,
    wire: wire
  };
})();
