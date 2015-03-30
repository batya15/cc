"use strict";

define(['domain/pages', 'views/entity/page', 'domain/net/users'], function (page, ViewPage, Users) {

    var namespace = 'users';

    return page.add({
        namespace: namespace,
        parent: 'control',
        icon: 'glyphicon-user',
        caption: 'Пользователи',
        Model: Users,
        View: ViewPage
    });
});

