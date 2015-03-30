"use strict";

define(['domain/pages', 'views/entity/page', 'domain/net/users'], function (page, ViewPage, Users) {

    var namespace = 'users';

    var fields =  {
        'name:4:b': 'lastname name',
        'age:2': 'age',
        'phone:4': 'phone'
    };

    return page.buildPage({
        namespace: namespace,
        parent: 'control',
        icon: 'glyphicon-user',
        caption: 'Пользователи',
        model: Users,
        fields: fields,
        view: ViewPage
    });
});

