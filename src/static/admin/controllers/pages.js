"use strict";

define(['domain/pages', 'domain/menu', 'router'], function(pages, menu, router) {

    var PagesController = function() {
        this.name = 'pagesController';
    };

    PagesController.prototype.addPage = function(data) {
        var modelMenu = menu.add({
            caption: data.namespace,
            url: '/' + data.namespace,
            namespace: data.namespace
        });
        router.route(data.namespace + '(/)*path', data.namespace);
        var modelPage = pages.add({
            id: data.namespace,
            View: data.view
        });

        return {
            menu: modelMenu,
            page:modelPage
        };
    };

    return new PagesController();

});