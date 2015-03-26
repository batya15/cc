"use strict";

define(['backbone'],
    function(Backbone) {

        var DefaultsView = Backbone.View.extend({
            initialize: function() {
                this.$el.text('У страницы нет View');
                console.error('NotFound VIEW');
            }
        });

        var Pages = Backbone.Collection.extend({
            model: Backbone.Model.extend({
                defaults: {
                    View: DefaultsView
                }
            })
        });

        return new Pages();
    });
