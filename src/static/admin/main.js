"use strict";

define('main', ['backbone', 'domain/ping', 'domain/auth', 'views/login/login', 'main.jade', 'vendor/js/bootstrap'],
    function (Backbone) {

    var auth = require('domain/auth'),
        template = require('main.jade'),
        Login = require('views/login/login');

    var MainView = Backbone.View.extend({
        el: 'body',
        initialize: function () {
            this.childrens  = [];
            this.listenTo(auth, 'change', this.loginLogout);
            setTimeout(function () {
                auth.checkLogin();
            }, 1000);
        },
        loginLogout: function() {
            this.removeChildren();
            this.$el.html(template());
            if (auth.isNew()) {
                this.initializeLoginForm();
            } else {
                this.initializeInterface();
            }
        },
        removeChildren: function() {
            _.each(this.childrens, function(view) {
                view.remove();
            });
            this.children = [];
        },
        initializeInterface: function() {
            // Загрузка основного интерфейса
        },
        initializeLoginForm: function() {
            // Загрузка формы в хода
            var login = new Login();
            this.childrens.push(login);
            this.$el.append(login.$el);
        }
    });

    return new MainView();

});

