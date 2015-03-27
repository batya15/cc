"use strict";

define(['views/entity/parentView', './submenu.jade', './item/item'],
    function (ParentView, template, Item) {

    return ParentView.extend({
        attributes: {
            class: 'v-subMenu'
        },
        tagName: 'li',
        events: {
            'click [data-main]' : 'onClick'
        },
        initialize: function () {
            this.collection = this.model.get('collection');
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.collection, 'remove', this.hideShowItem);
            this.listenTo(this.model, 'remove', this.remove);
            this.listenTo(this.model, 'change:show', this.toggle);
            this.render();
        },
        render: function () {
            this.$el.html(template({item: this.model.attributes}));
            this.collection.each(this.addItem, this);
            this.hideShowItem();
        },
        addItem: function (model) {
            var item = new Item({model: model});
            this.addChild(item);
            this.$('[data-submenu]').append(item.$el);
            this.hideShowItem();
        },
        onClick: function() {
            this.model.set('show', !this.model.get('show'));
        },
        toggle: function () {
            var height = (this.model.get('show'))? this.$('[data-submenu]').height(): 0;
            this.$('.subMenu').height(height);
            if (height) {
                this.$el.addClass('open');
            } else {
                this.$el.removeClass('open');
            }
        },
        hideShowItem: function() {
            if (this.model.get('collection').length) {
                this.$el.show();
            } else {
                this.$el.hide();
            }
        }
    });

});

