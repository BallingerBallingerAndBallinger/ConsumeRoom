(() => {
  var entityBase = require('../crappy-entity.js');
  var doorBuilder = require('./door.js');

  function initialize(renderer, movementHandler) {
    var constructor = () => {
      var entity = entityBase.initialize(renderer, movementHandler);
      var door = doorBuilder.initialize(renderer);
      var render = renderer;

      var self = { name: 'floor-closed', x: 0, y: -1 };
      var eating = false;
      var blinking = false;
      var blinked = false;
      var blinkAnimationTime = 0;
      var puckeringFactor = 1;

      var room = Object.assign({}, entity);
      room.update = update;
      room.setEating = setEating;
      return room;

      function update(timestamp, delta) {
        render.image(self.x, 200, 'room-base', 1000, '');

        if (eating) {
          puckeringFactor = Math.random() > 0.5 ? puckeringFactor + 0.01 : puckeringFactor - 0.01;
        } else {
          puckeringFactor = 1;
        }


        var width  = 350 * puckeringFactor;
        var height = 350 * puckeringFactor * (300 / 428);

        var leftEyeImage = 'left-eye-open';
        var rightEyeImage = 'right-eye-open';
        var eyeWidth = 125;
        var eyeHeight = 125;
        var eyesCenterX = 500;
        var eyesY = 950;
        var interOcularDistance = 275;

        if (Math.random() < 0.01) {
          blinking = true;
          blinked = false;
          blinkAnimationTime = 250;
        }

        if (blinking) {
          leftEyeImage = 'left-eye-blink';
          rightEyeImage = 'right-eye-blink';
          if (blinked && blinkAnimationTime <= 0) {
            blinking = false;
            blinked = false;
            leftEyeImage = 'left-eye-open';
            rightEyeImage = 'right-eye-open';
          } else if (blinkAnimationTime <= 0) {
            blinking = true;
            blinked = true;
            leftEyeImage = 'left-eye-closed';
            rightEyeImage = 'right-eye-closed';
            blinkAnimationTime = 1000;
          }
          blinkAnimationTime -= delta;
        }
        if (blinked) {
          leftEyeImage = 'left-eye-closed';
          rightEyeImage = 'right-eye-closed';
          if (blinkAnimationTime <= 0) {
            blinking = true;
            leftEyeImage = 'left-eye-blink';
            rightEyeImage = 'right-eye-blink';
            blinkAnimationTime = 250;
          }
          blinkAnimationTime -= delta;
        }

        if (eating) {
          render.image(500 - (width / 2), 750 - (height / 2), 'floor-open', width, height);
          leftEyeImage = 'left-eye-angry';
          rightEyeImage = 'right-eye-angry';
        } else {
          render.image(500 - (width / 2), 750 - (height / 2), 'floor-closed', width, height);
        }

        render.image(eyesCenterX - (eyeWidth / 2) - interOcularDistance, eyesY - (eyeHeight / 2), leftEyeImage, eyeWidth, eyeHeight);
        render.image(eyesCenterX - (eyeWidth / 2) + interOcularDistance, eyesY - (eyeHeight / 2) - 12, rightEyeImage, eyeWidth, eyeHeight);

        door.update(timestamp, delta);
      }

      function setEating(newEating) {
        if (eating !== newEating) {
          if (newEating) {
            render.stopAudio('eat');
            render.audio('eat');
          }
        }
        eating = newEating;
        door.setClosed(newEating);
      }
    };

    return constructor();
  }

  module.exports = {
    initialize: initialize
  };
})();
