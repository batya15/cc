"use strict";

define(['views/entity/parentView', 'underscore', 'domain/router', 'views/entity/create/create', 'views/entity/edit/edit',
    'views/entity/list/list', 'views/entity/preview/preview'],
    function (ParentView, _) {

    var router = require('domain/router'),
        List = require('views/entity/list/list'),
        Create = require('views/entity/create/create'),
        Preview = require('views/entity/preview/preview'),
        Edit = require('views/entity/edit/edit');

    return ParentView.extend({
        List: List,
        Create: Create,
        Preview: Preview,
        Edit: Edit,
        initialize: function () {
            this.listenTo(router, 'change:path', this._loadModule);
            this._loadModule();
        },
        _loadModule: function () {
            this._removeChildren();
            if (router.get('path') && _.isFunction(this[router.get('path')[0]])) {
                this[router.get('path')[0]].call(this, arguments);
            } else {
                this.list.call(this, arguments);
            }
        },
        list: function () {
            var m = this.model.get('Model');
            m = (m)? new m(): {};
            var v = new this.List({
                model: m,
                page: this.model
            });
            this.addChild(v);
            this.$el.append(v.$el);
        },
        edit: function () {
            var v = new this.Edit();
            this.addChild(v);
            this.$el.append(v.$el);
        },
        create: function () {
            var v = new this.Create();
            this.addChild(v);
            this.$el.append(v.$el);
        },
        preview: function () {
            var v = new this.Preview();
            this.addChild(v);
            this.$el.append(v.$el);
        }
    });

});


