define(['backbone', './mainMenu.jade'], function(Backbone, template) {

    return Backbone.View.extend({
        attributes: {
            class: 'v-mainMenu'
        },
        initialize: function() {
            this.$el.html(template());
        }
    });

});