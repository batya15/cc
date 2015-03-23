"use strict";
define(['domain/net/auth', 'vendor/js/jquery.cookie'], function (auth) {

    QUnit.module('domain/net/auth');

    var login = 'root',
        pass  = '123';

    $.removeCookie('sessionKey', { path: '/'});

    QUnit.asyncTest('Проверка не залогиненого пользователя', function (assert) {
        expect(1);

        auth.checkLogin(function(err, user){
            assert.ok(user === null, 'Прислан пустой результат, пользователь не залогинен');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Ввод неправильного логина', function (assert) {
        expect(4);

        auth.login(login+'1', pass, function(err, sessionKey){
            assert.ok(err === 'ERROR_AUTH', 'Ошибка входа');
            assert.ok(!sessionKey, 'Ключ сессии пустой');
            assert.ok(auth.isNew(), 'Backbone модель очистилась');
            assert.ok(!$.cookie('sessionKey'), 'куки удалились');
            QUnit.start();
        });
    });


    QUnit.asyncTest('Ввод неправильного пароля', function (assert) {
        expect(4);

        auth.login(login, pass + '1', function(err, sessionKey){
            assert.ok(err == 'ERROR_AUTH', 'Ошибка входа');
            assert.ok(auth.isNew(), 'Backbone модель очистилась');
            assert.ok(!sessionKey, 'Ключ сессии пустой');
            assert.ok(!$.cookie('sessionKey') , 'куки удалились');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Коректный вход', function (assert) {
        expect(4);

        auth.login(login, pass, function(err, sessionKey, user){
            assert.ok(!err, 'Ошибок входе нет');
            assert.ok(sessionKey, 'Ключ сесии есть!');
            assert.ok(auth.get('name') == user.name, 'Backbone модель создана');
            assert.ok($.cookie('sessionKey') == sessionKey, 'куки установились!');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Проверка залогиненого пользователя', function (assert) {
        expect(2);

        auth.checkLogin(function(err, user){
            assert.ok(user.login == login, 'Объект пользователя пришел');
            assert.ok(auth.get('login') == login, 'Модель создана');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Разлогирование пользователя', function (assert) {
        expect(3);

        auth.logout(function(res){
            assert.ok(res === true, 'Успех при разлогировании');
            assert.ok(auth.isNew(), 'Backbone модель очистилась');
            assert.ok(!$.cookie('sessionKey'), 'куки удалились');
            QUnit.start();
        });
    });


});