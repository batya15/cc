"use strict";

define(['backbone'], function (Backbone) {

    return Backbone.View.extend({
        initialize: function () {
            this.$el.text('Просмотр');
        }
    });

});

