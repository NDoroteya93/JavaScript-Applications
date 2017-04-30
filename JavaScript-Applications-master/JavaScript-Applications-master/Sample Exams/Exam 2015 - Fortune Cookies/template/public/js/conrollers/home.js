import * as data from 'data';
import { load as loadTemplate } from 'templates';
// import homeTemplate from 'homeTemplate!text';


const $appContainer = $('#app-container');

function homeController(params) {

    const { category } = params;

    Promise.all([
            loadTemplate('home'),
            data.getCookies()

        ])
        .then(([template, cookies]) => {
            $appContainer.html(template(cookies));

        });
}

export { homeController };