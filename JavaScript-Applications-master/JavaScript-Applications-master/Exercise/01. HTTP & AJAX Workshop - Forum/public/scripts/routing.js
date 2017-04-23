'use strict';

let router = (() => {

    function init() {
        let navigo = new Navigo(null, false);

        navigo.on('/gallery', () => {
            console.log('Navigo works!');
        });
    }

    return {
        init
    }
})();

export { router };