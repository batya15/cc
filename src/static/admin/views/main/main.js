define(['backbone', './main.jade', 'views/userMenu/userMenu', 'domain/net/auth', 'views/menu/menu', 'router',
        'views/entity/parentView', 'views/content/content'],
    function (Backbone, template) {

        var UserMenu = require('views/userMenu/userMenu'),
            Menu = require('views/menu/menu'),
            auth = require('domain/net/auth'),
            router = require('router'),
            Content = require('views/content/content'),
            ParentView = require('views/entity/parentView');


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

                if (!Backbone.History.started) {
                    Backbone.history.start({pushState: true, root: '/pjax'});
                }
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
            },
            remove: function () {
                ParentView.prototype.remove.apply(this);
            }
        });

    });