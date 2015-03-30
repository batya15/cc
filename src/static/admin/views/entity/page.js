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
        initialize: function (data) {
            this.fields = data.fields;
            this.listenTo(router, 'route:' + data.namespace, this._loadModule);
            this._loadModule(data.arg);
        },
        _loadModule: function (path, param) {
            this._removeContent();
            if (!_.isArray(path)) {
                path = [path, param];
            }
            if (_.isFunction(this[path[0]])) {
                this[path[0]].call(this, path[1]);
            } else {
                this.list(path[1]);
            }
        },
        list: function (p) {
            this.content = new this.List({model: this.model, path: p, fields: this.fields});
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
        },
        remove: function () {
            this._removeContent();
            Backbone.View.prototype.remove.apply(this);
        }
    });

});


