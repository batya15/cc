"use strict";

define(['backbone', 'controllers/pages'], function(Backbone, pages) {

    var namespace = 'brands';

    var View = Backbone.View.extend({
        initialize: function (data) {
            console.log(data);
            this.$el.text('Здесь редактируем Бранды');
        }
    });

    return pages.addPage({
        namespace: namespace,
        view: View
    });

});

