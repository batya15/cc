"use strict";

define(['domain/ping'], function (ping) {

    var lang = {
        'login': 'Логин',
        'name': 'Имя',
        'lastname': 'Фамилия',
        'phone': 'Телефон',
        'description': 'Описание',
        'email': 'Почта'
    };

    return function (key) {
        if (lang.hasOwnProperty(key)) {
            return lang[key]
        } else {
            return key
        }

    };

});

