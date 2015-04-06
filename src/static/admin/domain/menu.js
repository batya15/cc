"use strict";
define(['backbone', 'underscore', 'domain/pages', './router'],
    function (Backbone, _, pages, router) {

    var config = {
        main: 'Основное',
        control: 'Управление',
        directory: 'Справочники',
        products: 'Продукция',
        content: 'Контент',
        request: 'Заявки',
        community: 'Комьюнити'
    };

    var SubMenu = Backbone.Collection.extend({
        initialize: function () {
            this.listenTo(router, 'change:namespace', this.navigation);
        },
        navigation: function () {
            this.each(function (m) {
                m.set('active', router.get('namespace') === m.id);
            }, this);
        },
        model: Backbone.Model.extend({
            navigation: function() {
                router.navigate(this.get('url'));
            }
        })
    });

    var Menu = Backbone.Collection.extend({
        initialize: function () {
            _.bindAll(this, '_buildMenu');
            _.each(config, this._buildMenu);
            pages.each(this._addItem, this);
            this.listenTo(pages, 'add', this._addItem);
        },
        _buildMenu: function (val, key) {
            var p = {
                id: key,
                namespace: key,
                caption: val,
                collection: new SubMenu()
            };
            return this.add(p);
        },
        _addItem: function (m) {
            router.route(m.get('namespace') + '(/)*path', m.get('namespace'));
            if (m.get('notMenu')) {
                return false;
            }
            var menu = this.get(m.get('parent'));
            if (!menu) {
                menu = this._buildMenu('other', 'other');
            }
            menu.get('collection').add({
                caption: m.get('caption') || m.get('namespace'),
                url: '/' + m.get('namespace'),
                namespace: m.get('namespace'),
                id: m.get('namespace'),
                icon: m.get('icon') || 'glyphicon-th-list'
            });
        }
    });

    return new Menu();

});

