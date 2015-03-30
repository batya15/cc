"use strict";
define(['backbone', './item.jade', 'router', 'alertify'
], function (Backbone, template, router, alertify) {

    alertify.set({
        labels: {
            ok: "Удалить",
            cancel: "Отменить"
        }, buttonFocus: "cancel"
    });

    return Backbone.View.extend({
        attributes: {
            class: 'v-item'
        },
        events: {
            'click': 'select',
            'click [data-preview]': 'preview',
            'click [data-edit]': 'edit',
            'click [data-remove]': 'removeItem'
        },
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.collection, 'active', this.active);
            this.listenTo(this.model, 'remove', this.remove);
        },
        render: function () {
            this.$el.html(template(this.model.attributes));
        },
        active: function (m) {
            this.model.set('active', (this.model.id === m.id));
        },
        select: function () {
            this.model.collection.trigger('active', this.model);
        },
        removeItem: function () {
            var self = this;
            alertify.confirm("Вы действительно хотите удалить?", function (e) {
                if (e) {
                    self.model.destroy();
                }
            });
        },
        edit: function () {
            router.navigate('users/edit?id=' + this.model.id, {trigger: true});
        },
        preview: function () {
            router.navigate('users/preview?id=' + this.model.id, {trigger: true});
        }
    });

});