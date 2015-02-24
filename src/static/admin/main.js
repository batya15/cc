"use strict";

define('main', ['backbone', 'jquery','domain/ping', 'domain/auth', 'views/login/login', 'main.jade', 'vendor/js/bootstrap'],
    function (Backbone, $) {

    var auth = require('domain/auth'),
        template = require('main.jade'),
        Login = require('views/login/login');

    var MainView = Backbone.View.extend({
        attributes: {
            class: 'v-mainApp'
        },
        initialize: function () {
            this.childrens  = [];
            this.listenTo(auth, 'change', this.loginLogout);
            auth.checkLogin();
        },
        render: function () {
            this.$el.html(template());
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

    return mainView;
});

