(function() {


  // ----------------------------------------------------------------------------
  // Globals
  //
  var renderCanvas;
  var renderContext;

  function initialize(canvasElement) {
    setCanvas(canvasElement);

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
  // Set the current canvas (element)
  //
  function setCanvas(elementName) {
    renderCanvas = document.getElementById(elementName);
    renderContext = renderCanvas.getContext('2d');
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

  module.exports = {
    initialize: initialize,
    startWorker: startWorker,
    stopWorker: stopWorker,
    startAnimation: startAnimation,
    stopAnimation: stopAnimation,
    line: line,
    circle: circle,
    rectangle: rectangle,
    text: text,
    image: image,
    video: video
  };
})();
