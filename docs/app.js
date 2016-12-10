/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* globals requestAnimationFrame */
	(function() {
	  'use strict';

	  var config = __webpack_require__(1);
	  var sprites = __webpack_require__(2);

	  var canvasElement;
	  window.onload = () => {
	    canvasElement = document.getElementById('canvas');
	    sprites.initialize(canvasElement);
	    requestAnimationFrame(grandLoop);
	  };

	  function grandLoop(timestamp) {
	    drawFrame(timestamp);
	    requestAnimationFrame(grandLoop);
	  }

	  function drawFrame(timestamp) {
	    var delta = getDelta(timestamp);
	    if (delta < 50) return;
	    updateDelta(timestamp);

	    sprites.update([
	      { name: 'crappy-room', x: 25, y: 10, size: 900 },
	      { name: 'crappy-party-dude', x: Math.random() * 50, y: 750, size: 600 },
	      { name: 'girl1', x: 500, y: 300, size: 400 },
	      { name: 'bloon', x: 250, y: 200, size: 200 },
	      { name: 'bear',  x: 55,  y: 450, size: 150 }
	    ]);
	    sprites.draw();
	    drawTitle(canvasElement.getContext('2d'));
	  }

	  var last;
	  function getDelta(timestamp) {
	    if (last === undefined) {
	      last = timestamp;
	      return 0;
	    }

	    return timestamp - last;
	  }

	  function updateDelta(timestamp) {
	    last = timestamp;
	  }

	  // Taken from a horrific w3c example
	  function drawTitle(ctx) {
	    ctx.font = '32px Verdana';
	    // Create gradient
	    var gradient = ctx.createLinearGradient(0, 0, 500, 0);
	    gradient.addColorStop('0', 'magenta');
	    gradient.addColorStop('0.5', 'blue');
	    gradient.addColorStop('1.0', 'red');
	    // Fill with gradient

	    var oldFill = ctx.fillStyle;
	    ctx.fillStyle = gradient;

	    ctx.fillText(config.title, 22, 32);
	    ctx.fillStyle = oldFill;
	  }
	})();


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = {
	  title: 'Consume Room'
	};


/***/ },
/* 2 */
/***/ function(module, exports) {

	(function() {
	  var sprites;
	  var width;
	  var height;
	  var context;

	  function initialize(canvasElement) {
	    context = canvasElement.getContext('2d');
	    width = canvasElement.width;
	    height = canvasElement.height;
	    sprites = [];
	  }

	  function draw() {
	    context.clearRect(0, 0, width, height);
	    sprites.forEach((sprite) => {
	      context.drawImage(document.getElementById(sprite.name), sprite.x, sprite.y, sprite.size, sprite.size);
	    });
	  }

	  function update(newState) {
	    sprites = newState;
	  }

	  module.exports = {
	    draw: draw,
	    update: update,
	    initialize: initialize
	  };
	})();


/***/ }
/******/ ]);