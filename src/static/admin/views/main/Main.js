define(['backbone', './main.jade', 'views/userMenu/UserMenu', 'domain/net/auth', 'views/mainMenu/MainMenu', 'router',
        'domain/plugins', 'views/entity/ParentView', 'views/plugins/Users/Users', 'views/plugins/Brands/Brands'],
    function (Backbone, template) {

        var UserMenu = require('views/userMenu/UserMenu'),
            MainMenu = require('views/mainMenu/MainMenu'),
            auth = require('domain/net/auth'),
            plugins = require('domain/plugins'),
            router = require('router'),
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
                this.showUserMenu();
                this.showMainMenu();

                this.listenTo(router, 'route', this.showContent);
                Backbone.history.start({pushState: true, root: '/pjax'});
            },
            showContent: function(namespace) {
                if (this.namespace === namespace) {
                    return false;
                }
                this.namespace = namespace;
                console.log(arguments);
                var View,
                    plugin = plugins.get(namespace);
                if (plugin) {
                    if (this.content) {
                        this.content.remove();
                    }
                    View = plugin.get('View');
                    this.content = new View();
                    this.$('[data-mainContent]').append(this.content.$el);
                } else {
                    console.info(namespace + '- plugin not found');
                }
            },
            toggleLeftMenu: function () {
               if (this.$('.leftPanel').hasClass('remove')) {
                    this.$('.leftPanel').removeClass('remove');
                } else {
                    this.$('.leftPanel').addClass('remove');
                }
            },
            showUserMenu: function () {
                var userMenu = new UserMenu({model: auth});
                this.addChild(userMenu);
                this.$('.topPanel').append(userMenu.$el);
                userMenu.render();
            },
            showMainMenu: function () {
                var mainMenu = new MainMenu();
                this.addChild(mainMenu);
                mainMenu.$el.appendTo(this.$('.mainMenuWrap'));
                mainMenu.render();
            }
        });

    });