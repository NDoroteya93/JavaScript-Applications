'use strict';

import { MyRouter } from 'router';
import { jquery } from 'jquery';
import { homeController } from 'home';
import { myCookieController } from 'myCookieController';

const router = new MyRouter();

router
    .on('/', () => location.hash = '#/home')
    .on('/home', homeController)
    .on('/home/:category', homeController)
    .on('/my-cookie', myCookieController);

$(window).on('load', () => router.navigate());
$(window).on('hashchange', () => router.navigate());