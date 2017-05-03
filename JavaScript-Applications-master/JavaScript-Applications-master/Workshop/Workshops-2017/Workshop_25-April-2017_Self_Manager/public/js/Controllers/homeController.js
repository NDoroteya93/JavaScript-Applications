'use strict';

import { loadTemplate } from 'loadTemplate';

const LOCAL_STORAGE_USERNAME_KEY = 'signed-in-user-username',
    LOCAL_STORAGE_AUTHKEY_KEY = 'signed-in-user-auth-key';

class HomeController {
    constructor() {
        this._container = $('#container');
    }

    get container() {
        return this._container;
    }

    getTemplate() {
        let lodaTemplate = new loadTemplate('home');
        lodaTemplate.getTemplate()
            .then(template => {
                this.container.html(template());
            });
    }
}

export { HomeController };