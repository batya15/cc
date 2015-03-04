define(['backbone', './item.jade'], function(Backbone, template){


    var Item = Backbone.View.extend({
        tagName: 'li',
        events: {
           'click [data-id]': 'navigation'
        },
        initialize: function() {
            this.childrens = [];
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'remove', this.remove);
            this.render();
        },
        render: function() {
            this.$el.html(template({item: this.model.attributes}));
            if (this.model.get('subMenu')) {
                var subMenu = new List({collection: this.model.get('subMenu')});
                this.$el.append(subMenu.$el);
                this.childrens.push(subMenu);
            }
        },
        navigation: function (e) {
            if ($(e.currentTarget).data('id') === this.model.get('namespace')) {
                if (this.model.get('url')) {
                    console.log('Выполняем переход' + this.model.get('url'));
                }
                if (this.$el.hasClass('open')) {
                    this.$el.removeClass('open');
                } else {
                    this.$el.addClass('open');
                }
            }

        },
        _removeChildren: function() {
            _.each(this.childrens, function(view) {
                view.remove();
            });
            this.children = [];
        },
        remove: function () {
            this._removeChildren();
            Backbone.View.prototype.remove.apply(this);
        }
    });

    var List = Backbone.View.extend({
        attributes: {
            class: 'v-subMenu'
        },
        tagName: 'ul',
        initialize: function() {
            this.childrens = [];
            this.collection.each(this.addItem, this);
        },
        addItem: function (model) {
            var item = new Item({model: model});
            this.childrens.push(item);
            this.$el.append(item.$el);
        },
        _removeChildren: function() {
            _.each(this.childrens, function(view) {
                view.remove();
            });
            this.children = [];
        },
        remove: function() {
            this._removeChildren();
            Backbone.View.prototype.remove.apply(this);
        }
    });

    return List;

});