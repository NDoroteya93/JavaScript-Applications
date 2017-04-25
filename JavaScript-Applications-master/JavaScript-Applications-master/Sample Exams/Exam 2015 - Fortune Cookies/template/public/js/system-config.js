'use strict';

SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '../../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // App files
        'main': './js/main.js',
        'router': 'js/router.js',

        // Libraries
        'jquery': '../../node_modules/jquery/dist/jquery.min.js'
    }
});


System.import('main');