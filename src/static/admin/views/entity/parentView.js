"use strict";
define(['backbone', 'underscore'], function(Backbone, _) {

    return Backbone.View.extend({
        addChild: function(child) {
            if (!this.childrens) {
                this.childrens = [];
            }
            _.each(arguments,  function(v) {this.childrens.push(v);}, this);
        },
        _removeChildren: function () {
            _.each(this.childrens, function (view) {
                view.remove();
            });
            this.childrens = [];
        },
        remove: function(){
            this._removeChildren();
            Backbone.View.prototype.remove.apply(this);
        }
    });



});
