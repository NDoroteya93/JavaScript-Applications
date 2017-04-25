'use strict';
const appContainer = $('#app-container');

class MyRouter {

    constructor() {
        this._routes = [];
    }
    on(targetUrl, callback) {
        this._routes.push({
            targetUrl,
            callback
        });

        return this;
    }

    navigate() {
        const currentUrl = location.hash.slice(1);

        for (const { targetUrl, callback }
            of this._routes) {
            const params = MyRouter.matchUrls(currentUrl, targetUrl);
            if (params) {
                callback(params);
                break;
            }
        }
    }

    static matchUrls(currentUrl, targetUrl) {

        const currentUrlParts = currentUrl.split(/\//g); // match #
        const targetUrlParts = targetUrl.split(/\//g); // match # on url address

        // if not matches
        if ((targetUrlParts.length !== currentUrlParts.length)) {
            return false;
        }

        const params = {};
        const len = currentUrlParts.length;
        for (let i = 0; i < len; i++) {
            if (targetUrlParts[i][0] !== ':') {
                if (targetUrlParts[i] !== currentUrlParts[i]) {
                    return false;
                }
            } else {
                const paramName = targetUrlParts[i].slice(1);
                params[paramName] = currentUrlParts[i];
            }
        }

        return params;
    }
}


const router = new MyRouter();

router
    .on('/home', () => appContainer.html('Home Page'))
    .on('/user', () => appContainer.html('Showing User '))
    .on('/user/:username', (params) => appContainer.html(`Showing info for ${params.username}`));

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());