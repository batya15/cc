"use strict";

define(['backbone', 'underscore', 'domain/router', 'views/entity/create/create', 'views/entity/edit/edit',
    'views/entity/list/list', 'views/entity/preview/preview'],
    function (Backbone, _) {

    var router = require('domain/router'),
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
            this.listenTo(router, 'change:path0', this._loadModule);
            this._loadModule();
        },
        _loadModule: function () {
            this._removeContent();
            if (router.get('path0') && _.isFunction(this[router.get('path0')])) {
                this[router.get('path0')].call(this, arguments);
            } else {
                router.set({path0: 'list'});
            }
        },
        list: function () {
            this.content = new this.List({model: this.model, path: null, fields: this.fields});
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


