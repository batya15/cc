define(['backbone', './main.jade', 'views/userMenu/UserMenu', 'domain/net/auth', 'views/mainMenu/MainMenu', 'router',
        'domain/plugins', 'views/entity/ParentView', 'views/Content/Content'],
    function (Backbone, template) {

        var UserMenu = require('views/userMenu/UserMenu'),
            MainMenu = require('views/mainMenu/MainMenu'),
            auth = require('domain/net/auth'),
            router = require('router'),
            Content = require('views/Content/Content'),
            ParentView = require('views/entity/ParentView');


        return ParentView.extend({
            attributes: {
                class: 'v-main'
            },
            events: {
                'click [data-menu]': 'toggleLeftMenu'
            },
            initialize: function () {
                this.$el.html(template());
                this.renderUserMenu();
                this.renderMainMenu();
                this.renderContent();

                Backbone.history.start({pushState: true, root: '/pjax'});
            },
            toggleLeftMenu: function () {
               if (this.$('.leftPanel').hasClass('remove')) {
                    this.$('.leftPanel').removeClass('remove');
                } else {
                    this.$('.leftPanel').addClass('remove');
                }
            },
            renderUserMenu: function () {
                this.newChild(UserMenu, '.topPanel', {model: auth});
            },
            renderMainMenu: function () {
                this.newChild(MainMenu, '.mainMenuWrap');
            },
            renderContent: function () {
                this.newChild(Content, '[data-mainContent]');
            },
            newChild: function (View, el, data) {
                var v = new View(data);
                this.addChild(v);
                v.$el.appendTo(this.$(el));
                v.render();
            }
        });

    });