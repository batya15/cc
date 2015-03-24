"use strict";
//todo: нужен ли такой роутер вообще
define(['backbone'], function (Backbone) {

    var Router = Backbone.Router.extend({
        routes: {
            "users(/)*path": "users",
            "": "home"
        }
    });

    return new Router();

});