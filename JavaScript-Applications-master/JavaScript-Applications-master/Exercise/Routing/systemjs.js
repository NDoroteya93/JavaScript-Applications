'use strict';

SystemJS.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': './node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './app-modules/main.js',
        'jquery': './bower_components/jquery/dist/jquery.js',
        'data': './app-modules/data.js',
        'utils': './app-modules/utils.js'
    }
});

System.import('main');