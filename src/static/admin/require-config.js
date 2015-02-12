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
                'vendor/underscore',
                'vendor/jquery'
            ],
            exports: 'Backbone'
        },
        'vendor/jquery.cookie': {
            deps: [
                'vendor/jquery'
            ],
            exports: '$'
        }
    },
    'map': {
        '*': {
            'css': 'vendor/css', // or whatever the path to require-css is
            'jquery': 'vendor/jquery'
        }
    }
});