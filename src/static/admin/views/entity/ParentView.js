"use strict";
define(['backbone'], function(Backbone) {

    return Backbone.View.extend({
        addChild: function(child) {
            if (!this.childrens) {
                this.childrens = [];
            }
            this.childrens.push(child);
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
