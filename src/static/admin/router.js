"use strict";

define(['backbone'], function (Backbone) {

    var Router = Backbone.Router.extend({
        routes: {
            "": "home"
        }
    });

    return new Router();

});