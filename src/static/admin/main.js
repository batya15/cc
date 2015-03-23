"use strict";

define('main', ['backbone', 'domain/net/ping', 'domain/net/auth', 'views/login/Login', 'vendor/js/bootstrap',
        'views/main/Main', 'views/entity/ParentView'],
    function (Backbone) {

    var auth = require('domain/net/auth'),
        Login = require('views/login/Login'),
        Main = require('views/main/Main'),
        UserMenu = require('views/userMenu/UserMenu'),
        ParentView = require('views/entity/ParentView');

    var MainView = ParentView.extend({
        el: 'body',
        initialize: function () {
            this.listenTo(auth, 'change', this.loginLogout);
            setTimeout(function () {
                auth.checkLogin();
            }, 0);
        },
        loginLogout: function() {
            this.$el.removeClass('load');
            if (auth.isNew()) {
                this.initializeLoginForm();
            } else {
                this.initializeInterface();
            }
        },
        initializeInterface: function() {
            var main = new Main({model: auth});
            this.addChild(main);
            main.$el.appendTo(this.$el);
            main.render();

        },
        initializeLoginForm: function() {
            var login = new Login();
            this.addChild(login);
            this.$el.append(login.$el);
        }
    });

    return new MainView();

});

