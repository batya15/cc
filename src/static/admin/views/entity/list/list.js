"use strict";

define(['underscore', 'views/entity/parentView', './list.jade', './numbers/numbers', './column/column', 'router'],
    function (_, ParentView, template, Numbers, Column, router) {

    return ParentView.extend({
        attributes: {
            class: 'v-list'
        },
        events: {
            'click [data-create]': 'create',
            'click [data-search]': 'search'
        },
        initialize: function (data) {
            var param;
            if (data.path) {
                    param = _.object(_.compact(_.map(data.path.split('&'), function(item) {if (item) {return item.split('=');} })));
                    this.model.set(param);
            }
            this.collection = this.model.get('collection');
            this.collection.fetch();
            this.listenTo(this.collection, 'add', this.addItem);
            this.listenTo(this.model, 'change', this.onModel);
            this.collection.each(this.addItem, this);
            this.render();
        },
        render: function () {
            var nTop = new Numbers({model: this.model});
            var nBottom = new Numbers({model: this.model});
            var column = new Column({model: this.model});

            this.addChild(nTop, nBottom, column);

            this.$el.html(template(this.model.attributes));

            this.$('[data-numbers-top]').append(nTop.$el);
            this.$('[data-numbers-bottom]').append(nBottom.$el);
            this.$('[data-column]').append(column.$el);
            column.render();
            nTop.render();
            nBottom.render();
        },
        onModel: function() {
            var search = 'active=' + this.model.get('active');
            if (this.model.get('search')) {
                search += '&search=' + this.model.get('search');
            }
            router.navigate('/users/list?' + search);
        },
        create: function () {
            router.navigate('/users/create', {trigger: true});
        },
        search: function () {
            var search = this.$('[data-search-val]').val();
            this.model.set({
                search: search,
                active: 1
            });
        },
        addItem: function (m) {
            //console.log(m);
        }
    });

});

