System.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '/libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '/libs/systemjs-plugin-babel/systemjs-babel-browser.js',


        // App files
        'app': 'js/app.js',
        'myRouter': 'js/router.js',
        'requester': 'js/requester.js',
        'data': 'js/data.js',
        'homeController': 'js/Controllers/homeController.js',
        'myCookieController': 'js/Controllers/myCookie.js',
        'templates': 'js/templates.js',
        'userController': 'js/Controllers/user.js',

        // Libs
        'jquery': 'libs/jquery/dist/jquery.min.js'
    }
});

System.import('app');