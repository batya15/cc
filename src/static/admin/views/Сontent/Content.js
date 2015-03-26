"use strict";

define(['views/entity/ParentView', 'router',
    'domain/pages',
    'views/plugins/Users/Users',
    'views/plugins/Brands/Brands'], function (ParentView, router) {

    //todo: Привести в порядок, выделить модуль Pages в место plugins
    //Page url, пункт меню, view
    var pages = require('domain/pages');

    return ParentView.extend({
        initialize: function () {
            this.listenTo(router, 'route', this.showContent);
        },
        render: function () {

        },
        showContent: function(namespace) {
            if (this.namespace === namespace) {
                return false;
            }
            this.namespace = namespace;
            var View,
                plugin = pages.get(namespace);
            if (plugin) {
                if (this.content) {
                    this.content.remove();
                }
                View = plugin.get('View');
                this.content = new View();
                this.$el.append(this.content.$el);
            } else {
                console.info(namespace + '- plugin not found');
            }
        }
    });

});

