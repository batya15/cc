define(['backbone', './main.jade', 'views/userMenu/UserMenu', 'domain/auth'], function(Backbone, template) {

    var UserMenu = require('views/userMenu/UserMenu'),
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
        },
        _removeChildren: function() {
            _.each(this.childrens, function(view) {
                view.remove();
            });
            this.children = [];
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
        }
    });

});