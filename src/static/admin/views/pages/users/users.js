"use strict";

define(['backbone', 'underscore', 'controllers/pages', 'router'], function (Backbone, _, pages, router) {

    var namespace = 'users';

    var ListView = Backbone.View.extend({
        initialize: function () {
            this.$el.text('Таблица');
        }
    });
    var EditView = Backbone.View.extend({
        initialize: function () {
            this.$el.text('Редактирование');
        }
    });
    var PreviewView = Backbone.View.extend({
        initialize: function () {
            this.$el.text('Просмотр');
        }
    });
    var CreateView = Backbone.View.extend({
        initialize: function () {
            this.$el.text('Просмотр');
        }
    });

    var View = Backbone.View.extend({
        events: {
            'click': 'add'
        },
        namespace: namespace,
        initialize: function (data) {
            this.listenTo(router, 'route:' + this.namespace, this.select);
            this.$el.text('Здесь редактируем пользователя');
            this.select(data);
        },
        select: function (path, param) {
            if (!_.isArray(path)) {
                path = [path, param];
            }
            if (_.isFunction(this[path[0]])) {
                this[path[0]].apply(this, path);
            } else {
                this.list();
            }
        },
        list: function () {
            this.removeContent();
            this.content = new ListView();
            this.$el.append(this.content.$el);
            console.log('table', arguments);
        },
        edit: function (a, s) {
            this.removeContent();
            this.content = new EditView();
            this.$el.append(this.content.$el);
            console.log('edit', a, s);
        },
        create: function () {
            this.removeContent();
            this.content = new CreateView();
            this.$el.append(this.content.$el);
            console.log('create', arguments);
        },
        preview: function () {
            this.removeContent();
            this.content = new PreviewView();
            this.$el.append(this.content.$el);
            console.log('preview', arguments);
        },
        item: function () {

        },
        removeContent: function () {
            if (this.content) {
                this.content.remove();
            }
        },
        add: function () {
            router.navigate(namespace + '/preview?22', {trigger: true});
        }
    });

    return pages.addPage({
        namespace: namespace,
        view: View
    });
});

