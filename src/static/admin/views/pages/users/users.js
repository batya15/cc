"use strict";

define(['domain/pages', 'views/entity/page', 'domain/net/users'], function (page, ViewPage, Users) {

    var namespace = 'users';

    return page.buildPage({
        namespace: namespace,
        parent: 'control',
        icon: 'glyphicon-user',
        caption: 'Пользователи',
        model: Users,
        view: ViewPage
    });
});

