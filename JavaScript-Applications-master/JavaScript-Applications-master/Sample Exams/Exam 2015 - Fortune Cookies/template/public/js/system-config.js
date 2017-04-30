'use strict';

SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '../../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'text': '../../node_modules/systemjs-plugin-text/text.js',
        // App files
        'app': './js/app.js',
        'router': 'js/router.js',
        'requester': 'js/requester.js',
        'data': 'js/data.js',
        'templates': 'js/templates.js',
        'home': 'js/conrollers/home.js',
        'myCookieController': 'js/conrollers/myCookie.js',

        // templates
        // 'homeTemplate': 'templates/home.handlebars',

        // Libraries
        'jquery': '../../node_modules/jquery/dist/jquery.min.js',
        'handlebars': '../../node_modules/handlebars/dist/handlebars.min.js'
    }
});


System.import('app');