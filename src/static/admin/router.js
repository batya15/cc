"use strict";

define(['backbone'], function (Backbone) {

    var Router = Backbone.Router.extend({
        routes: {
            "users(/)*path": "users",
            "brands(/)": "brands",
            "": "home"
        }
    });

    return new Router();

});