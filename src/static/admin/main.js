"use strict";

define('main', ['domain/ping'], function (ping) {

    var lang = {
        'login': 'Логин',
        'name': 'Имя',
        'lastname': 'Фамилия',
        'phone': 'Телефон',
        'description': 'Описание',
        'email': 'Почта'
    };

    setInterval(function () {
        ping(function (data) {
            console.info(data);
        });
    }, 1000);

    return function (key) {
        if (lang.hasOwnProperty(key)) {
            return lang[key];
        } else {
            return key;
        }

    };

});

