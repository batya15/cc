"use strict";

define('main', ['domain/net/ping', 'domain/net/auth', 'views/login/login', 'vendor/js/bootstrap',
        'views/main/main', 'views/entity/parentView'],
    function () {

    var auth = require('domain/net/auth'),
        Login = require('views/login/login'),
        Main = require('views/main/main'),
        ParentView = require('views/entity/parentView');

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
            this._removeChildren();
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

