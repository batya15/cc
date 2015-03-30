"use strict";

define(['backbone'], function (Backbone) {

    var instance;

    var Users = Backbone.Collection.extend({
        namespace: 'users',
        sync: function () {
            console.log(arguments);
            this.add({id: 1});
            this.add({id: 3});
            this.add({id: 4});
            this.add({id: 2});
        },
        model: Backbone.Model.extend({
            resetPassword: function (cb) {
                this.collection.socket.emit("resetPassword", this.attributes, cb);
            }
        })
    });

    var Model = Backbone.Model.extend({
        defaults: {
            count: 10,
            active: 2
        },
        initialize: function () {
            var c = new Users();
            this.set('collection', c);
        }
    });

    return function () {
        if (!instance) {
            instance = new Model();
        }
        return instance;
    };

});