"use strict";

define(['backbone', './userMenu.jade'], function (Backbone, template) {

    return Backbone.View.extend({
        name: 'userMenu',
        events: {
            'click [data-exit]': 'logout'
        },
        attributes: {
            class: 'v-userMenu'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },
        render: function () {
            this.$el.html(template({
                user: this.model.attributes
            }));
        },
        logout: function () {
            this.model.logout();
        }
    });

});

