"use strict";

define(['backbone', 'underscore', 'router', 'views/entity/create/create', 'views/entity/edit/edit',
    'views/entity/list/list', 'views/entity/preview/preview'],
    function (Backbone, _) {

    var router = require('router'),
        List = require('views/entity/list/list'),
        Create = require('views/entity/create/create'),
        Preview = require('views/entity/preview/preview'),
        Edit = require('views/entity/edit/edit');

    return Backbone.View.extend({
        List: List,
        Create: Create,
        Preview: Preview,
        Edit: Edit,
        initialize: function (data, namespace) {
            this.listenTo(router, 'route:' + namespace, this._loadModule);
            this._loadModule(data);
        },
        _loadModule: function (path, param) {
            this._removeContent();
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
            this.content = new this.List();
            this.$el.append(this.content.$el);
        },
        edit: function () {
            this.content = new this.Edit();
            this.$el.append(this.content.$el);
        },
        create: function () {
            this.content = new this.Create();
            this.$el.append(this.content.$el);
        },
        preview: function () {
            this.content = new this.Preview();
            this.$el.append(this.content.$el);
        },
        _removeContent: function () {
            if (this.content) {
                this.content.remove();
            }
        }
    });

});


