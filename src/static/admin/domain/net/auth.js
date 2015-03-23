"use strict";
define([
    'domain/entity/socket',
    'backbone',
    'vendor/js/jquery.cookie'
], function (io, Backbone) {

    var Auth = Backbone.Model.extend({
        name: 'auth service',
        initialize: function () {
            this.socket = io('auth');
        },
        reconnect: function (cb) {
            this.socket.io.disconnect();
            this.socket.io.skipReconnect = false;
            this.socket.io.reconnect();
            if (_.isFunction(cb)) {
                cb.apply(this, arguments);
            }
        },
        checkLogin: function (cb) {
            this.socket.emit('checkLogin', _.bind(function (err, user) {
                if (err) {
                    this.clear({silent: true});
                    $.removeCookie('sessionKey', {path: '/'});
                } else {
                    this.set(user, {silent: true});
                }
                this.trigger('change');
                if (_.isFunction(cb)) {
                    cb.apply(this, arguments);
                }
            }, this));
        },
        login: function (login, password, cb) {
            this.socket.emit('login', {"login": login, "password": password}, _.bind(function (err, sessionKey, user) {
                var _arguments = arguments;
                if (!err && sessionKey) {
                    $.cookie('sessionKey', sessionKey, {path: '/'});
                    this.set(user);
                    this.reconnect(function () {
                        if (_.isFunction(cb)) {
                            cb.apply(this, _arguments);
                        }
                    });
                } else {
                    this.clear();
                    $.removeCookie('sessionKey', {path: '/'});
                    if (_.isFunction(cb)) {
                        cb.apply(this, arguments);
                    }
                }
            }, this));
        },
        logout: function (cb) {
            this.socket.emit('logout', _.bind(function () {
                var _arguments = arguments;
                this.clear();
                $.removeCookie('sessionKey', {path: '/'});
                this.reconnect(function () {
                    if (_.isFunction(cb)) {
                        cb.apply(this, _arguments);
                    }
                });
            }, this));
        }
    });

    return new Auth();

});