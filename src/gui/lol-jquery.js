(() => {
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
    addClass: addClass,
    removeClass: removeClass
  };
})();
