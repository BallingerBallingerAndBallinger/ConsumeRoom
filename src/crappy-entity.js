(function() {

    // Includes
    var _ = require('lodash');


    // Rendering
    var context;

    // Method Injections
    var moveMethod;



    function initialize(canvasElement) {
        context = canvasElement.getContext('2d');

    }

    // Rendering
    function render(timestamp, delta) {

     


    }


    // Injected Methods
    function move(entity,deltaX,deltaY) {
        moveMethod(entity,deltaX,deltaY);
    }



    // Exports
    module.exports = {
        render: render,
        initialize: initialize
    };


})();
