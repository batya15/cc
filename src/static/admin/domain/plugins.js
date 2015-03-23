"use strict";

define(['backbone'],
    function(Backbone) {

    var DefaultsView = Backbone.View.extend({
        initialize: function() {
            this.$el.text('Плаген не найден или нет доступа');
        }
    });

    var Plugins = Backbone.Collection.extend({
        model: Backbone.Model.extend({
            defaults: {
                View: DefaultsView
            }
        })
    });

    return new Plugins();
});
