"use strict";

define(['backbone', 'domain/plugins'], function(Backbone, plugins) {

    var namespace = 'users';

    var View = Backbone.View.extend({
        initialize: function (data) {
            console.log(data);
            this.$el.text('Здесь редактируем пользователя');
        }
    });

    plugins.add({
        id: namespace,
        View: View
    });

    return View;
});

