"use strict";

define('main', ['backbone', 'jquery','domain/ping', 'domain/auth', 'views/login/login', 'main.jade'],
    function (Backbone, $) {

    var auth = require('domain/auth'),
        ping = require('domain/ping'),
        template = require('main.jade'),
        Login = require('views/login/login');

    var MainView = Backbone.View.extend({
        attributes: {
            class: 'v-mainApp'
        },
        initialize: function () {
            this.childrens  = [];
            this.listenTo(auth, 'change:id', this.loginLogout);
            auth.checkLogin();
        },
        render: function () {
            console.log('RENDER');
            this.$el.html(template());
            this.loginLogout();
        },
        loginLogout: function() {
            this.removeChildren();
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

    var mainView = new MainView();
    $('body').html(mainView.$el);
    mainView.render();

    setInterval(function () {
        ping(function (data) {
            console.info(data);
        });
    }, 1000);

    return mainView;
});

