"use strict";

define([
    'views/entity/parentView',
    'domain/router',
    'domain/pages',
    'views/pages/users/users',
    'views/pages/brands/brands',
    'views/pages/home/home',
    'views/pages/country/country',
    'views/pages/products/products',
    'views/pages/content/content',
    'views/pages/orders/orders',
    'views/pages/comment/comment'

], function () {

    var pages = require('domain/pages'),
        router = require('domain/router'),
        ParentView = require('views/entity/parentView'),
        currentView;

    return ParentView.extend({
        initialize: function () {
            this.listenTo(router, 'change:namespace', this.onRoute);
        },
        onRoute: function () {
            var namespace = router.get('namespace'),
                page = pages.get(namespace),
                View;

            if (!page) {
                page = pages.get('home');
            }
            if (currentView) {
                currentView.remove();
            }
            View = page.get('View');
            document.title = page.get('caption');
            currentView = new View({model: page});
            this.$el.append(currentView.$el);
        }
    });

});

