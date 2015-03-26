define(['backbone', 'domain/menu', './item.jade', 'router'],
    function (Backbone, menu, template, router) {

        console.log(menu);

        var Item = Backbone.View.extend({
            tagName: 'li',
            events: {
                'click [data-id]': 'navigation'
            },
            initialize: function () {
                this.childrens = [];
                this.listenTo(this.model, 'change:active', this.active);
                this.listenTo(this.model, 'remove', this.remove);
                this.render();
            },
            active: function () {
                if (this.model.get('active')) {
                    this.$el.addClass('active');
                } else {
                    this.$el.removeClass('active');
                }
            },
            render: function () {
                this.$el.html(template({item: this.model.attributes}));
                this.active();
                if (this.model.get('subMenu')) {
                    var subMenu = new List({collection: this.model.get('subMenu')});
                    this.$el.append(subMenu.$el);
                    this.childrens.push(subMenu);
                }
            },
            navigation: function (e) {
                if ($(e.currentTarget).data('id') === this.model.get('namespace')) {
                    if (this.model.get('url')) {
                        router.navigate(this.model.get('url'), {trigger: true});
                    }
                }
                menu.active(this.model);
            },
            _removeChildren: function () {
                _.each(this.childrens, function (view) {
                    view.remove();
                });
                this.childrens = [];
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
            initialize: function () {
                this.childrens = [];
                this.collection.each(this.addItem, this);
            },
            addItem: function (model) {
                var item = new Item({model: model});
                this.childrens.push(item);
                this.$el.append(item.$el);
            },
            _removeChildren: function () {
                _.each(this.childrens, function (view) {
                    view.remove();
                });
                this.childrens = [];
            },
            remove: function () {
                this._removeChildren();
                Backbone.View.prototype.remove.apply(this);
            }
        });

        return List.extend({
            attributes: {
                class: 'v-mainMenu'
            },
            collection: menu
        });

    });