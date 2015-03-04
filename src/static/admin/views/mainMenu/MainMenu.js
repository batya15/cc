define(['backbone', 'underscore', './item/list'],
    function (Backbone, _ , List) {

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
            url: '/setting',
            parent: 'control'
        },
        brands: {
            caption: 'Настройки',
            url: '/brands',
            parent: 'directory'
        },
        country: {
            caption: 'Страны',
            url: '/country',
            parent: 'directory'
        }
    };
    var MainMenu = Backbone.Collection.extend({
        initialize: function() {
            _.bindAll(this, 'buildMenu');
            _.each(menuConfig, this.buildMenu);
        },
        buildMenu: function (item, key) {
            if(item.hasOwnProperty('parent')) {
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
        model: Backbone.Model.extend({
            idAttribute: "namespace"
        })
    });
    var mainMenu = new MainMenu();
    console.log(mainMenu);

    return List.extend({
        attributes: {
            class: 'v-mainMenu'
        },
        collection: mainMenu
    });

});