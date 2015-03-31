"use strict";

define(['backbone'],
    function (Backbone) {

        var DefaultsView = Backbone.View.extend({
            initialize: function () {
                this.$el.text('У страницы нет View');
                console.error('NotFound VIEW');
            }
        });

        var Pages = Backbone.Collection.extend({
            model: Backbone.Model.extend({
                defaults: {
                    namespace: 'not_found_namespace',
                    View: DefaultsView
                },
                idAttribute: "namespace"
            })
        });

        return new Pages();
    });
