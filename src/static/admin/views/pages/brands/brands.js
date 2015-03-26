"use strict";

define(['controllers/pages', 'views/entity/page', 'views/entity/list/list'], function (pageController, Page, List) {

    var namespace = 'brands';

    var NewList = List.extend({
        initialize: function () {
            this.$el.html('Переопределили метод');
        }
    });

    var View = Page.extend({
        List: NewList,
        batya: function() {
            this.$el.html('asdf');
        }
    });

    return pageController.addPage({
        namespace: namespace,
        view: View
    });
});
