"use strict";

define([
    'views/entity/parentView',
    'router',
    'domain/pages',
    'views/pages/users/users',
    'views/pages/brands/brands'
], function (ParentView, router) {

    var pages = require('domain/pages');

    return ParentView.extend({
        initialize: function () {
            this.listenTo(router, 'route', this.showContent);
        },
        showContent: function(namespace, param) {
            if (this.namespace === namespace) {
                return false;
            }
            this.namespace = namespace;
            var View, Model,
                page = pages.get(namespace);
            if (page) {
                if (this.content) {
                    this.content.remove();
                }
                View = page.get('View');
                Model = page.get('Model');
                this.content = new View({
                    arg: param,
                    namespace: namespace,
                    model: new Model(),
                    fields: page.get('fields')
                });
                this.$el.append(this.content.$el);
            } else {
                console.info(namespace + '- plugin not found');
            }
        }
    });

});

