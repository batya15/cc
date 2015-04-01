"use strict";

define(['domain/pages', 'views/entity/page', 'views/entity/list/list'], function (pages, Page, List) {

    var namespace = 'orders';

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

    return pages.add({
        namespace: namespace,
        parent: 'request',
        icon: 'glyphicon-shopping-cart',
        caption: 'Заказы',
        View: View
    });
});
