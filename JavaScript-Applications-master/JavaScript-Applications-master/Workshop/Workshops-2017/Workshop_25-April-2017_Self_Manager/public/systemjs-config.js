System.config({
    'transpiler': 'plugin-babel',
    'map': {
        'plugin-babel': '/libs/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '/libs/systemjs-plugin-babel/systemjs-babel-browser.js',

        // App files
        'main': 'js/main.js',
        'templates': 'js/templates.js',
        'requester': 'js/requester.js',
        'loadTemplate': 'js/templates.js',

        // Models
        'userModel': 'js/Models/userModel.js',
        'todosModel': 'js/Models/todoModel.js',

        // Controllers
        'userController': 'js/Controllers/userController.js',
        'todosController': 'js/Controllers/todosController.js',

        // Libs
        'jquery': 'libs/jquery/dist/jquery.min.js',
        'navigo': 'libs/navigo/lib/navigo.min.js'
    }
});

System.import('main');