"use strict";

define(['backbone', 'domain/menu', 'router'],
    function (Backbone, menu, router) {

        var DefaultsView = Backbone.View.extend({
            initialize: function () {
                this.$el.text('У страницы нет View');
                console.error('NotFound VIEW');
            }
        });

        var Pages = Backbone.Collection.extend({
            buildPage: function (data) {
                var modelMenu = menu.addItem({
                    parent: data.parent,
                    caption: data.caption,
                    url: '/' + data.namespace,
                    namespace: data.namespace,
                    id: data.namespace,
                    icon: data.icon
                });
                router.route(data.namespace + '(/)*path', data.namespace);
                var modelPage = this.add({
                    id: data.namespace,
                    View: data.view,
                    model: data.model
                });

                return {
                    menu: modelMenu,
                    page: modelPage
                };
            },
            model: Backbone.Model.extend({
                defaults: {
                    View: DefaultsView
                }
            })
        });

        return new Pages();
    });
