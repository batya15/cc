define(['backbone', './main.jade', 'views/userMenu/UserMenu', 'domain/auth', 'views/mainMenu/MainMenu'],
    function(Backbone, template) {

    var UserMenu = require('views/userMenu/UserMenu'),
        MainMenu = require('views/mainMenu/MainMenu'),
        auth = require('domain/auth');

    return Backbone.View.extend({
        attributes: {
            class: 'v-main'
        },
        events: {
            'click [data-menu]': 'toggleLeftMenu'
        },
        initialize: function () {
            this.childrens  = [];
            this.$el.html(template());
            this.showUserMenu();
            this.showMainMenu();
        },
        _removeChildren: function() {
            _.each(this.childrens, function(view) {
                view.remove();
            });
            this.children = [];
        },
        remove: function() {
            this._removeChildren();
            Backbone.View.prototype.remove.apply(this);
        },
        toggleLeftMenu: function () {
            if (this.$('.leftPanel').hasClass('remove')) {
                this.$('.leftPanel').removeClass('remove');
            } else {
                this.$('.leftPanel').addClass('remove');
            }
        },
        showUserMenu: function() {
            var userMenu = new UserMenu({model: auth});
            userMenu.$el.appendTo(this.$('.topPanel'));
            userMenu.render();
            this.childrens.push(userMenu);
        },
        showMainMenu: function() {
            var mainMenu = new MainMenu();
            mainMenu.$el.appendTo(this.$('.mainMenuWrap'));
            mainMenu.render();
            this.childrens.push(mainMenu);
        }
    });

});