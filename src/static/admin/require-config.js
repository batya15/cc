require.config({
    waitSeconds: 15,
    baseUrl: '/',
    shim: {
        'vendor/jquery': {
            exports: '$'
        },
        'vendor/underscore': {
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
        }
    },
    'map': {
        '*': {
            'css': 'vendor/js/css', // or whatever the path to require-css is
            'jquery': 'vendor/js/jquery'
        }
    }
});