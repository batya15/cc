"use strict";

define(['backbone', 'domain/plugins'], function(Backbone, plugins) {

    var namespace = 'brands';

    var View = Backbone.View.extend({
        initialize: function (data) {
            console.log(data);
            this.$el.text('Здесь редактируем Бранды');
        }
    });

    plugins.add({
        id: namespace,
        View: View
    });

    return View;
});

