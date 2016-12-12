// PRIMITIVE RENDERING CALLS

(function() {


  // ============================================================================
  // PROPERTIES
  //
  var renderContext;
  var canvasWidth;
  var canvasHeight;



  // ============================================================================
  // CONSTRUCTORS
  //
  function initialize(canvasElement) {
    renderContext = canvasElement.getContext('2d');
    canvasWidth = canvasElement.width;
    canvasHeight = canvasElement.height;
  }


  // ============================================================================
  // PROCESSES
  //

  // ----------------------------------------------------------------------------
  // Start a worker
  //
  //  Executes every milliseconds
  //  Returns a handle to the worker which can be used to stop it
  //
  function startWorker(workFunction, milliseconds) {
    return window.setInterval(workFunction, milliseconds);
  }

  // ----------------------------------------------------------------------------
  // Stop a worker
  //
  function stopWorker(handle) {
    window.clearInterval(handle);
  }

  // ----------------------------------------------------------------------------
  // Start an animation
  //
  //  Returns a handle to the animation timer which can be used to stop it
  //
  function startAnimation(animationFunction) {
    return window.requestAnimationFrame(animationFunction);
  }

  // ----------------------------------------------------------------------------
  // Stop animation
  //
  function stopAnimation(handle) {
    window.cancelAnimationFrame(handle);
  }

  function animate(animationFunction) {
    animationFunction();
    return window.requestAnimationFrame(() => animate(animationFunction));
  }





  // ============================================================================
  // PRIMITIVES
  //

  // ----------------------------------------------------------------------------
  // Clear
  //
  function clear() {
    renderContext.clearRect(0, 0, canvasWidth, canvasHeight);
  }

  // ----------------------------------------------------------------------------
  // Line
  //
  function line(x, y, x1, y1, borderColor) {
    renderContext.beginPath();
    renderContext.moveTo(x, y);
    renderContext.lineTo(x1, y1);
    renderPath(borderColor, null);
  }

  // ----------------------------------------------------------------------------
  // Circle
  //
  function circle(x, y, radius, borderColor, fillColor) {
    renderContext.beginPath();
    renderContext.arc(x, y, radius, 0, 2 * Math.PI, false);
    renderPath(borderColor, fillColor);
  }

  // ----------------------------------------------------------------------------
  // Rectangle
  //
  function rectangle(x, y, width, height, borderColor, fillColor) {
    renderContext.beginPath();
    renderContext.rect(x, y, width, height);
    renderPath(borderColor, fillColor);
  }

  // ----------------------------------------------------------------------------
  // Text
  //
  //  Defaults to Arial and 14px
  //
  function text(x, y, text, fontName, fontSize, borderColor, fillColor) {

    if (fontSize === null || fontSize === '') fontSize = '14px';
    if (fontName === null || fontName === '') fontName = 'Arial';
    renderContext.font = fontSize + ' ' + fontName;

    // Draw
    if (fillColor != null && fillColor !== '') {
      renderContext.fillText(text, x, y);
    }

    if (borderColor != null && borderColor !== '') {
      renderContext.strokeText(text, x, y);
    }
  }

  // ----------------------------------------------------------------------------
  // Path
  //
  //   points = [[x,y],[x,y]...]
  //   bool close = close the path
  //   Existence of a fill color, or close==true will cause path to be closed
  //
  function path(points, borderColor, fillColor, close) {

    for(i=0; i<points.length; i++) {
      var x = points[i][0];
      var y = points[i][1];
      if (i==0)
        renderContext.moveTo(x,y);
      else
        renderContext.lineTo(x,y);
    }
    if (close == true || (fillColor != null && fillColor != "")) renderContext.closePath();
    renderPath(borderColor,fillColor);
  }

  // ----------------------------------------------------------------------------
  // Image
  //
  //  Blank or null width or height preserves aspect ratio of image
  //  Source image is stored in DOM
  //  Checks for video width and height if image width or height are zero
  //
  function image(x, y, imageId, width, height) {
    var img = document.getElementById(imageId);

    var sourceHeight = img.height;
    if (sourceHeight === 0) sourceHeight = img.videoHeight;

    var sourceWidth = img.width;
    if (sourceWidth === 0) sourceWidth = img.videoHeight;

    var aspect = sourceWidth / sourceHeight;

    if (height > 0 && (width === null || width === '')) {
      width = height * aspect;
    }

    if (width > 0 && (height === null || height === '')) {
      height = width / aspect;
    }

    renderContext.drawImage(img, x, y, width, height);
  }

  // ----------------------------------------------------------------------------
  // Video
  //
  //  Updates an image from a video every 20 milliseconds
  //  Returns a handle to the worker which can be used to stop it with stopWorker
  //  Source video is stored in DOM
  //  Video must be started and stopped independently
  //
  function video(x, y, videoId, width, height) {
    return animate(() => image(x, y, videoId, width, height), 20);
  }

  // ----------------------------------------------------------------------------
  // Audio
  //
  //  Plays some sound

  function audio(audioId) {
    var sound = document.getElementById(audioId);
    sound.play();
  }

  function stopAudio(audioId) {
    var sound = document.getElementById(audioId);
    sound.pause();
    sound.currentTime = 0;
  }

  function pauseAudio(audioId) {
    var sound = document.getElementById(audioId);
    sound.pause();
  }

  // ----------------------------------------------------------------------------
  // Render the current path
  //
  function renderPath(borderColor, fillColor) {
    if (borderColor !== null && borderColor !== '') {
      renderContext.strokeStyle = borderColor;
      renderContext.stroke();
    }

    if (fillColor !== null && fillColor !== '') {
      renderContext.fillStyle = fillColor;
      renderContext.fill();
    }
  }

  function getWidth() {
    return canvasWidth;
  }

  function getHeight() {
    return canvasHeight;
  }

  function transformEventToCoords(event) {
    var rect = event.target.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) * (getWidth() / rect.width),
      y: (event.clientY - rect.top) * (getHeight() / rect.height)
    };
  }

  module.exports = {
    initialize: initialize,
    startWorker: startWorker,
    stopWorker: stopWorker,
    startAnimation: startAnimation,
    stopAnimation: stopAnimation,
    clear: clear,
    line: line,
    circle: circle,
    rectangle: rectangle,
    text: text,
    image: image,
    video: video,
    audio: audio,
    stopAudio: stopAudio,
    pauseAudio: pauseAudio,
    getWidth: getWidth,
    getHeight: getHeight,
    transformEventToCoords: transformEventToCoords
  };

})();
