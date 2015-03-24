"use strict";

define(['backbone'], function (Backbone) {

    var Router = Backbone.Router.extend({
        routes: {
            "users(/)*path": "users",
            "brands(/)*path": "brands",
            "": "home"
        }
    });

    return new Router();

});