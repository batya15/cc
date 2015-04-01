"use strict";

define(['backbone', 'router', 'underscore'], function(Backbone, router, _) {

    var Router = Backbone.Model.extend({
        initialize: function () {
            this.listenTo(router, 'route', this.route);
            this.listenTo(this, 'change', this.navigate);
        },
        route: function (namespace, other) {
            this.clear({silent: true});
            var path = '';
            var param = {};

            if (other[0]) {
                path = _.map(other[0].split('/'))[0];
            }

            if (other[1]) {
                param = _.object(_.compact(_.map(other[1].split('&'), function (item) {
                    if (item) {
                        return item.split('=');
                    }
                })));
            }
            this.set(_.extend({namespace: namespace, path: path}, param));
            console.log(this.get('path'));
        },
        navigate: function () {
            var url = '/' + this.get('namespace');

            if (this.get('path')) {
                url += '/' + this.get('path');
            }

            var r = _.compact(_.map(this.attributes, function(val, key) {
                console.log(key, val);
                if (key !== 'namespace' && key !== 'path' && val) {
                    return key + '=' + val;
                }
            })).join('&');

            if (r.length) {
                url += '?' + r;
            }
            console.log(url);
            router.navigate(url);
        }
    });


    return new Router();

});