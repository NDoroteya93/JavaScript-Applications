'use strict';

// pyramid of dead
(function() {
    function pause(delay) {
        setTimeout(function() {
            console.log('pause for ' + delay + 'ms');
        }, delay);
    }

    console.log('start');
    var delay = 2000;
    setTimeout(() => {
        console.log('pause for ' + delay + 'ms');
        console.log('middle 1');

        setTimeout(() => {
            console.log('pause for ' + delay + 'ms');
            console.log('middle 2');

            setTimeout(() => {
                console.log('pause for ' + delay + 'ms');
                console.log('end');
            }, delay);
        }, delay);
    }, delay);
    pause(2000);
    console.log('middle');
    pause(2000);
    console.log('end');
}());