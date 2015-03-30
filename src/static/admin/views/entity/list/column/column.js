"use strict";

define(['jquery', 'backbone', './column.jade'], function ($, Backbone, template) {

    return Backbone.View.extend({
        attributes: {
            class: 'v-column'
        },
        events: {
            'click [data-key]': 'onClick'
        },
        initialize: function (data) {
            this.listenTo(this.model, 'change', this.render);
            this.opt = data.opt;
            console.log(data.opt);
        },
        render: function () {
            console.log(this.opt);
            this.$el.html(template({
                columns: this.opt,
                sortBy: this.model.get('sortBy'),
                revert: this.model.get('revert')
            }));
        },
        onClick: function (e) {
            var key = $(e.currentTarget).data('key');
            this.model.set({
                sortBy: key,
                revert: (this.model.get('sortBy') === key)? !this.model.get('revert'): this.model.get('revert')
            });
        }
    });

});

