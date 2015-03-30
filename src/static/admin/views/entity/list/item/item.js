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
        initialize: function (data) {
            this.opt = data.opt;
            this.fields = this._parseRows();
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model.collection, 'active', this.active);
            this.listenTo(this.model, 'remove', this.remove);
        },
        render: function () {
            this.$el.html(template({
                id: this.model.get('id'),
                rows: this.fields
            }));
            console.log(this.fields);
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
        },
        _parseRows: function () {
            var opt = {};

            _.each(this.opt, function (val, key) {
                var value = val.value;
                var v = '';

                _.each(value, function (val) {
                    var t = this.model.get(val);
                    v = (t)? v + ' '+ t : v;
                }, this);
                opt[key] = _.extend({}, val, {value: v});
            }, this);

            return opt;
        }
    });

});