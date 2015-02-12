"use strict";
define(['domain/ping'], function (ping) {

    QUnit.module('domain/ping');

    QUnit.asyncTest('Проверка пинга', function (assert) {
        expect(1);

        ping(function(data){
            assert.ok(data, 'Пинг успешно прошел');
            QUnit.start();
        });

    });
});