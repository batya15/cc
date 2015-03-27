"use strict";

define(['domain/pages', 'views/entity/page'], function (page, Page) {

    var namespace = 'users';

    return page.buildPage({
        namespace: namespace,
        parent: 'control',
        icon: 'glyphicon-user',
        caption: 'Пользователи',
        view: Page
    });
});

