"use strict";

define(['backbone', 'router', 'underscore'], function (Backbone, router) {

    var Router = Backbone.Model.extend({
        initialize: function () {
            this.listenTo(router, 'route', this._onRouter);
        },
        path: new Backbone.Model(),
        navigate: function (url) {
            router.navigate(url, {trigger: true});
        },
        _onRouter: function (namespace, param) {
            var path = [],
                search = {};
            if (param[0]) {
                path = param[0].split('/');
            }
            if (param[1]) {
                search = _.object(_.compact(_.map(param[1].split('&'), function (item) {
                    if (item) {
                        return item.split('=');
                    }
                })));
            }
            this.set({
                namespace: namespace,
                path: path,
                search: search
            });
        },
        setUrl: function () {
            var url,
                search = '';

            Backbone.Model.prototype.set.apply(this, arguments);

            url = '/' + this.get('namespace');
            _.each(this.get('path'), function (val) {
                url += '/' + val;
            });
            _.each(this.get('search'), function (val, key) {
                if (search.length) {
                    search += '&' + key + '=' + val;
                } else {
                    search += key + '=' + val;
                }
            });
            if (search.length) {
                url += '?' + search;
            }

        },
        route: function (reg, ns) {
            router.route(reg, ns);
        }
    });


    return new Router();

});