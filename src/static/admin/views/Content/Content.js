"use strict";

define(['views/entity/ParentView', 'router',
    'views/plugins/Users/Users',
    'views/plugins/Brands/Brands'], function (ParentView, router) {


    //todo: Привести в порядок, выделить модуль Pages в место plugins
    //Page url, пункт меню, view
    var plugins = require('domain/plugins');

    return ParentView.extend({
        initialize: function () {
            this.listenTo(router, 'route:brands', this.render2);
        },
        render: function () {
            this.$el.html('Content');
        },
        render2: function () {
            console.log(arguments);
            this.$el.html('Brands');
        },
        showContent: function(namespace) {
            if (this.namespace === namespace) {
                return false;
            }
            this.namespace = namespace;
            var View,
                plugin = plugins.get(namespace);
            if (plugin) {
                if (this.content) {
                    this.content.remove();
                }
                View = plugin.get('View');
                this.content = new View();
                this.$('[data-mainContent]').append(this.content.$el);
            } else {
                console.info(namespace + '- plugin not found');
            }
        }
    });

});

