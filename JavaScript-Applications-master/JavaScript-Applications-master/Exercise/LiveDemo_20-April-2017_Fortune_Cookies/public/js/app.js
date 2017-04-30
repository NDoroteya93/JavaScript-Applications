'use strict';

import { MyRouter } from 'myRouter';
import 'jquery';
import { homeController } from 'homeController';
import { myCookieController } from 'myCookieController';
import * as userController from 'userController';

const router = new MyRouter();

router
    .on('', () => location.hash = '#/home') // fixed later
    // redirect to home
    .on('/', () => location.hash = '#/home')
    .on('/home', homeController)
    .on('/home/:category', homeController)
    .on('my-cookie', myCookieController)
    .on('/auth', userController.get)
    .on('/login', userController.login)
    .on('/register', userController.register)
    .on('/logout', userController.logout)

$(window).on('load', router => router.navigate());
$(window).on('hashchange', () => router.navigate());