define(['backbone', 'views/entity/parentView', 'domain/menu', './item.jade', 'router'],
    function (Backbone, ParentView, menu, template, router) {

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

        var List = ParentView.extend({
            attributes: {
                class: 'v-subMenu'
            },
            tagName: 'li',
            initialize: function () {
                this.collection = this.model.get('collection');
                this.listenTo(this.collection, 'add', this.addItem);
                this.listenTo(this.collection, 'remove', this.hideShowItem);
                this.listenTo(this.model, 'change', this.render);
                this.listenTo(this.model, 'remove', this.remove);

                this.render();

            },
            render: function () {
                console.log(this.model.attributes);
                this.$el.html(template({item: this.model.attributes}));
                this.collection.each(this.addItem, this);
                this.hideShowItem();
            },
            addItem: function (model) {
                var item = new Item({model: model});
                this.addChild(item);
                this.$el.append(item.$el);
                this.hideShowItem();
            },
            hideShowItem: function() {
                if (this.model.get('collection').length) {
                    this.$el.show();
                } else {
                    this.$el.hide();
                }
            }
        });

        return ParentView.extend({
            attributes: {
                class: 'v-mainMenu'
            },
            tagName: 'ul',
            initialize: function () {
                this.childrens = [];
                menu.each(this.addItem, this);
                this.listenTo(menu, 'add', this.addItem);
            },
            addItem: function (model) {
                var item = new List({model: model});
                this.addChild(item);
                this.$el.append(item.$el);
            }

        });


    });