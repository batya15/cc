"use strict";

define(['backbone', 'controllers/pages'], function(Backbone, pages) {

    var namespace = 'users';

    var View = Backbone.View.extend({
        initialize: function (data) {
            console.log(data);
            this.$el.text('Здесь редактируем пользователя');
        }
    });

    return pages.addPage({
        namespace: namespace,
        view: View
    });
});

