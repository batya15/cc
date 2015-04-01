"use strict";

define(['domain/pages', 'views/entity/page', 'views/entity/list/list'], function (pages, Page, List) {

    var namespace = 'home';

    var NewList = List.extend({
        initialize: function () {
            this.$el.html('Главная страница');
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
        parent: 'main',
        icon: 'glyphicon-th-large',
        caption: 'Главная',
        View: View
    });
});
