"use strict";

define(['backbone', 'domain/plugins', 'domain/mainMenu', 'router'], function(Backbone, plugins, mainMenu, router) {

    var namespace = 'users';


    // todo: Вынести логику инициализации в класс page
    // Инициализация меню, роутера
    mainMenu.add({
        caption: 'UUUSSSEEERRR',
        url: '/brands',
        namespace: 'users'
    });

    router.route('brands(/)*path', 'brands');
    router.route('/test/me/again', 'testAgainRoute');

    var View = Backbone.View.extend({
        initialize: function (data) {
            console.log(data);
            this.$el.text('Здесь редактируем пользователя');
        }
    });

    plugins.add({
        id: namespace,
        View: View
    });

    return View;
});

