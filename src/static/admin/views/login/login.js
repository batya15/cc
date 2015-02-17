define(['backbone', './login.jade'], function (Backbone) {

    return Backbone.View.extend({
        name: 'loginForm',
        events: {},
        attributes: {
            class: 'v-loginForm'
        },
        initialize: function () {
            console.log('render login form');
        },
        remove: function() {
            Backbone.View.prototype.remove.apply(this);
        }
    });
});