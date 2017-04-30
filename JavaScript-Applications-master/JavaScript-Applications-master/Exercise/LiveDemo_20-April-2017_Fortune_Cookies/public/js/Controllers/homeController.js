'use strict';

import * as data from 'data';
import { load as loadTemplate } from 'templates';
import { requester } from 'requester'

const $appContainer = $('#app-container');

function homeController(params) {
    Promise.all([
            loadTemplate('home'),
            data.getCookies()
        ])
        .then(([template, cookies]) => {
            console.log(cookies);
            $appContainer.html(template(cookies));
        });
}

export { homeController };