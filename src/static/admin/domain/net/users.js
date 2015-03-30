"use strict";

define(['backbone'], function (Backbone) {

    var instance;

    var Users = Backbone.Collection.extend({
        namespace: 'users',
        sync: function () {
            console.log(arguments);
            var obj = {
                name: 'Batyr',
                lastname: 'Charyev',
                age: '20',
                phone: '+79251565527',
                address: 'Moscow'
            };
            this.add(_.extend({id: 1}, obj));
            this.add(_.extend({id: 3}, obj));
            this.add(_.extend({id: 4}, obj));
            this.add(_.extend({id: 2}, obj));
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