(() => {
  function checkMovement(x, y) {
    if (x < 0) {
      return false;
    }

    if (x > 1) {
      return false;
    }

    if (y < 0) {
      return false;
    }

    if (y > 1) {
      return false;
    }

    return true;
  }

  module.exports = {
    initialize: () => {},
    check: checkMovement
  };
})();
