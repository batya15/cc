"use strict";

define(['jquery', 'backbone', './numbers.jade'], function ($, Backbone, template) {

    return Backbone.View.extend({
        events: {
            'click [data-num]': 'onClick'
        },
        attributes: {
            class: 'v-numbers'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(template(this.model.attributes));
        },
        onClick: function(e) {
            var i = $(e.currentTarget).data('num');
            this.model.set('active', i);
        }
    });

});

