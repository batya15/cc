"use strict";

define(['backbone', './item.jade'], function (Backbone, template) {

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'navigation'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
            this.render();
        },
        render: function () {
            this.$el.html(template({item: this.model.attributes}));
        },
        navigation: function () {
            this.model.navigation();
        }
    });

});

