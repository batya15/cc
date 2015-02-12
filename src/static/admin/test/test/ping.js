"use strict";
define(function () {

    var ping = {
        ping: function(cb) {
            setTimeout(function() {
                cb({data:null})
            }, 500)
        }
    };

    QUnit.module('domain/ping');

    QUnit.asyncTest('Проверка пинга', function (assert) {
        expect(1);

        ping.ping(function(data){
            assert.ok(data, 'Пинг успешно прошел');
            QUnit.start();
        });

    });
});