"use strict";

define(['jquery', 'backbone', './column.jade'], function ($, Backbone, template) {

    return Backbone.View.extend({
        attributes: {
            class: 'v-column'
        },
        events: {
            'click [data-key]': 'onClick'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            this.$el.html(template({
                columns: {
                    name: {
                        caption: "Имя",
                        size: 3
                    },
                    age: {
                        caption: "Возраст",
                        size: 2
                    },
                    phone: {
                        caption: "Телефон",
                        size: 5
                    }
                },
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

