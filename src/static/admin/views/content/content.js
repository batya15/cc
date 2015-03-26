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
        render: function () {

        },
        showContent: function(namespace, param) {
            if (this.namespace === namespace) {
                return false;
            }
            console.log('users');
            this.namespace = namespace;
            var View,
                plugin = pages.get(namespace);
            if (plugin) {
                if (this.content) {
                    this.content.remove();
                }
                View = plugin.get('View');
                this.content = new View(param);
                this.$el.append(this.content.$el);
            } else {
                console.info(namespace + '- plugin not found');
            }
        }
    });

});

