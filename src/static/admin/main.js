"use strict";

define('main', ['backbone', 'domain/ping', 'domain/auth', 'views/login/login', 'main.jade', 'vendor/js/bootstrap',
        'views/userMenu/userMenu'],
    function (Backbone) {

    var auth = require('domain/auth'),
        template = require('main.jade'),
        Login = require('views/login/login'),
        UserMenu = require('views/userMenu/userMenu');

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
            var userMenu = new UserMenu({model: auth});
            userMenu.$el.appendTo(this.$('.topPanel'));
            userMenu.render();
            this.childrens.push(userMenu);

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

