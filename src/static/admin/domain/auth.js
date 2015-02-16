"use strict";
define([
    './entity/socket',
    'backbone',
    'vendor/js/jquery.cookie'
], function (io, Backbone) {

    var Auth = Backbone.Model.extend({
        name: 'auth service',
        initialize: function () {
            this.socket = io('auth');
            this.socket.on('user', _.bind(function (err, user) {
                if (err) {
                    this.clear();
                    this.trigger('change:id');
                } else {
                    this.set(user);
                }
            }, this));
        },
        checkLogin: function (cb) {
            if (_.isFunction(cb)) {
                cb.apply(this, arguments);
            }
        },
        login: function (login, password, cb) {
            this.socket.emit('login', {"login": login, "password": password}, _.bind(function (err, sessionKey, user) {
                if (!err && sessionKey) {
                    $.cookie('sessionKey', sessionKey, {path: '/'});
                    this.set(user);
                } else {
                    this.clear();
                    $.removeCookie('sessionKey', { path: '/'});
                }
                if (_.isFunction(cb)) {
                    cb.apply(this, arguments);
                }
            }, this));
        },
        logout: function (cb) {
            this.socket.emit('logout', _.bind(function (data) {
                this.clear();
                $.removeCookie('sessionKey', { path: '/'});
                location.reload();
                if (_.isFunction(cb)) {
                    cb.apply(this, arguments);
                }
            }, this));
        }
    });

    return new Auth();

});