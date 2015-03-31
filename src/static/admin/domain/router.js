"use strict";

define(['backbone', 'router'], function(Backbone, router) {

    var Router = Backbone.Model.extend({
        initialize: function () {
            this.listenTo(router, 'route', this.route);
        },
        route: function (namespace, other) {
            console.log(other);
            this.set({
               namespace: namespace
            });
        }
    });


    return new Router();

});