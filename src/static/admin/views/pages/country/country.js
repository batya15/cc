"use strict";

define(['domain/pages', 'views/entity/page', 'views/entity/list/list'], function (pages, Page, List) {

    var namespace = 'country';

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
        parent: 'directory',
        icon: 'glyphicon-globe',
        caption: 'Страны',
        View: View
    });
});
