require.config({
    waitSeconds: 15,
    baseUrl: '/',
    shim: {
        'vendor/js/jquery': {
            exports: '$'
        },
        'vendor/js/underscore': {
            exports: '_'
        },
        'vendor/backbone': {
            deps: [
                'vendor/js/underscore',
                'vendor/js/jquery'
            ],
            exports: 'Backbone'
        },
        'vendor/js/jquery.cookie': {
            deps: [
                'vendor/js/jquery'
            ],
            exports: '$'
        },
        'vendor/js/bootstrap': {
            deps: [
                'vendor/js/jquery'
            ],
            exports: '$'
        }
    },
    'map': {
        '*': {
            'css': 'vendor/js/css', // or whatever the path to require-css is
            'jquery': 'vendor/js/jquery',
            'underscore': 'vendor/js/underscore',
            'backbone': 'vendor/js/backbone',
            'spin': 'vendor/js/spin',
            'alertify': 'vendor/js/alertify'
        }
    }
});