define(['backbone', './main.jade', 'views/userMenu/_UserMenu', 'domain/net/auth', 'views/menu/_Menu', 'router',
        'entity/_ParentView', 'views/_Сontent/_Content'],
    function (Backbone, template) {

        var UserMenu = require('views/userMenu/_UserMenu'),
            Menu = require('views/menu/_Menu'),
            auth = require('domain/net/auth'),
            router = require('router'),
            Content = require('views/_Сontent/_Content'),
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
                this.newChild(Menu, '.mainMenuWrap');
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