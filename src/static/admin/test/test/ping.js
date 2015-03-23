"use strict";
define(['domain/net/ping'], function (ping) {

    QUnit.module('domain/net/ping');

    QUnit.asyncTest('Проверка пинга', function (assert) {
        expect(1);

        ping(function(data){
            assert.ok(data, 'Пинг успешно прошел');
            QUnit.start();
        });

    });
});