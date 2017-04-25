'use strict';
import { data } from 'data';
import { templateLoader } from 'templateLoader';
let router = (() => {

    function init() {
        let navigo = new Navigo(null, false);

        navigo.on('/gallery', () => {
            Promise.all([data.gallery.get(), tl.get('gallery')])
                .then(([data, template]) => {
                    template(data);
                })
                .catch(console.log)
        });
    }

    return {
        init
    }
})();

export { router };