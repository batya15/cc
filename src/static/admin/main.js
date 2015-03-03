"use strict";

define('main', ['backbone', 'domain/ping', 'domain/auth', 'views/login/Login', 'vendor/js/bootstrap',
        'views/main/Main'],
    function (Backbone) {

    var auth = require('domain/auth'),
        Login = require('views/login/Login'),
        Main = require('views/main/Main'),
        UserMenu = require('views/userMenu/UserMenu');

    var MainView = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            this.childrens  = [];
            this.listenTo(auth, 'change', this.loginLogout);
            setTimeout(function () {
                auth.checkLogin();
            }, 0);
        },
        loginLogout: function() {
            this.$el.removeClass('load');
            this._removeChildren();
            if (auth.isNew()) {
                this.initializeLoginForm();
            } else {
                this.initializeInterface();
            }
        },
        _removeChildren: function() {
            _.each(this.childrens, function(view) {
                view.remove();
            });
            this.children = [];
        },
        remove: function() {
            this._removeChildren();
            Backbone.View.prototype.remove.apply(this);
        },
        initializeInterface: function() {
            var main = new Main({model: auth});
            main.$el.appendTo(this.$el);
            main.render();
            this.childrens.push(main);

        },
        initializeLoginForm: function() {
            var login = new Login();
            this.childrens.push(login);
            this.$el.append(login.$el);
        }
    });

    return new MainView();

});

