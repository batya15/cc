"use strict";

define(['backbone', 'router', 'underscore'], function(Backbone, router, _) {

    var Router = Backbone.Model.extend({
        initialize: function () {
            this.listenTo(router, 'route', this.route);
            this.listenTo(this, 'change', this.navigate);
        },
        route: function (namespace, other) {
            this.clear({silent: true});
            this.param = {};
            this.paths = {};

            if (other[0]) {
                this.paths = _.object(_.compact(_.map(other[0].split('/'), function (val, i) {
                    if (val) {
                        return ['path'+i, val];
                    }
                })));
            }
            if (other[1]) {
                this.param = _.object(_.compact(_.map(other[1].split('&'), function (item) {
                    if (item) {
                        return item.split('=');
                    }
                })));
            }
            this.set(_.extend({namespace: namespace}, this.param, this.paths));
        },
        navigate: function () {
            var url = '/' + this.get('namespace');

            _.each(this.paths, function(val) {
                url += '/' + val;
            });
            var r = _.map(this.param, function(val, key) {
                return (val)? key + '=' + val: false;
            }).join('&');

            if (r.length) {
                url += '?' + r;
            }
            console.log(url);
            router.navigate(url);
        }
    });


    return new Router();

});