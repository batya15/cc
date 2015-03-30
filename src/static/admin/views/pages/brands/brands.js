"use strict";

define(['domain/pages', 'views/entity/page', 'views/entity/list/list'], function (pages, Page, List) {

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

    return pages.buildPage({
        namespace: namespace,
        parent: 'directory',
        icon: 'glyphicon-tags',
        caption: 'Бренды',
        view: View
    });
});