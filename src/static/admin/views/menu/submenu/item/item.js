"use strict";

define(['backbone', './item.jade', 'router'], function (Backbone, template, router) {

    return Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'navigation'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'change:active', this.render);
            this.listenTo(this.model, 'remove', this.remove);
            this.listenTo(router, 'route', this.route);
            this.render();
        },
        render: function () {
            this.$el.html(template({item: this.model.attributes}));
            this.active();
        },
        route: function (namespace) {
            this.model.set('active', namespace === this.model.id);
        },
        active: function () {
            if (this.model.get('active')) {
                this.$el.addClass('active');
            } else {
                this.$el.removeClass('active');
            }
        },
        navigation: function () {
            router.navigate(this.model.get('url'), {trigger: true});
        }
    });

});

