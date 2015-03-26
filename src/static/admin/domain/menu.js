"use strict";
define(['backbone', 'underscore'], function (Backbone, _) {

    var menuConfig = {
        main: {
            caption: 'Главная',
            url: '/'
        },
        control: {
            caption: 'Управление'
        },
        directory: {
            caption: 'Справочники'
        },
        products: {
            caption: 'Продукция'
        },
        content: {
            caption: 'Контент'
        },
        request: {
            caption: 'Заявки'
        },
        community: {
            caption: 'Комьюнити'
        },
        user: {
            caption: 'Пользователи',
            url: '/users',
            parent: 'control'
        },
        setting: {
            caption: 'Настройки',
            url: '/brands/asdf',
            parent: 'control'
        },
        brands: {
            caption: 'Настройки',
            url: '/users/rtt?asdf=adf&adf=adf#df',
            parent: 'directory'
        },
        country: {
            caption: 'Страны',
            url: '/users/kkf',
            parent: 'directory'
        }
    };

    var MainMenu = Backbone.Collection.extend({
        initialize: function () {
            _.bindAll(this, 'buildMenu');
            _.each(menuConfig, this.buildMenu);
        },
        buildMenu: function (item, key) {
            if (item.hasOwnProperty('parent')) {
                if (!this.get(item.parent)) {
                    this.add({namespace: item.parent});
                }
                if (!this.get(item.parent).get('subMenu')) {
                    this.get(item.parent).set({subMenu: new Backbone.Collection()});
                }
                this.get(item.parent).get('subMenu').add(_.extend({namespace: key}, item));
            } else {
                this.add(_.extend({namespace: key}, item));
            }
        },
        active: function (activeModel) {
            this.each(function (m) {
                m.set({active: (m === activeModel)});
            });
        },
        model: Backbone.Model.extend({
            idAttribute: "namespace"
        })
    });

    return new MainMenu();

});

