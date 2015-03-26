"use strict";
define(['../../views/entity/parentView', 'backbone'], function (ParentView, Backbone) {

    QUnit.module('views/entity/ParentView');

    QUnit.test('Проверка удаления дочерних View', function (assert) {
        expect(2);

        var parent = new ParentView();
        var child = new Backbone.View({
            attributes: {
                class: 'child'
            }
        });

        parent.addChild(child);
        child.$el.appendTo(parent.$el);
        var div = parent.$el.find('.child');
        assert.ok(div.length, 'Дочерняя View создана');

        parent.remove();
        var div2 = parent.$el.find('.child');
        assert.ok(!div2.length, 'Дочерняя View удалена после удаляения Родителя');

    });



});