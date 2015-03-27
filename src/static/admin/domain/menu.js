"use strict";
define(['backbone', 'underscore'], function (Backbone, _) {

    var config = {
        main: 'Главная',
        control: 'Управление',
        directory: 'Справочники',
        products: 'Продукция',
        content: 'Контент',
        request: 'Заявки',
        community: 'Комьюнити'
    };


    var Menu = Backbone.Collection.extend({
        initialize: function () {
            _.bindAll(this, '_buildMenu');
            _.each(config, this._buildMenu);
        },
        _buildMenu: function (item, key) {
            var p = {
                namespace: key,
                caption: item,
                collection: new Backbone.Collection()
            };
            return this.add(p);
        },
        addItem: function (item) {
            if (!_.isObject(item)) {
                return false;
            }
            var menu = this.get(item.parent);
            if (!menu) {
                menu = this._buildMenu('other', 'other');
            }
            menu.get('collection').add(item);
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

    return new Menu();

});

