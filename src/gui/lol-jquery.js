(() => {
  function addClass(element, klass) {
    var classes = element.className.split(' ');
    if (classes.includes(klass)) return;
    element.className += ' ' + klass;
  }

  function removeClass(element, klass) {
    var classes = element.className.split(' ');
    element.className = classes.filter((k) => k !== klass).join(' ');
  }

  module.exports = {
    addClass: addClass,
    removeClass: removeClass
  };
})();
