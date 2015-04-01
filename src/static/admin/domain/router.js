"use strict";

define(['backbone', 'router', 'underscore'], function(Backbone, router) {

    var Router = Backbone.Model.extend({
        initialize: function () {
            this.listenTo(router, 'route', this.onRouter);
        },
        navigate: function (url) {
            router.navigate(url);
        },
        onRouter: function (namespace) {
            this.set('namespace', namespace);
        },
        route: function (reg, ns) {
            router.route(reg, ns);
        }
    });


    return new Router();

});