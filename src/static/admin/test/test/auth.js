"use strict";
define(['domain/auth', 'vendor/js/jquery.cookie'], function (auth) {

    QUnit.module('domain/auth');

    var login = 'test',
        pass  = 'test',
        hash  = 'test';

    $.removeCookie('sessionKey', { path: '/'});

    QUnit.asyncTest('Проверка не залогиненого пользователя', function (assert) {
        expect(1);

        auth.checkLogin(function(user){
            assert.ok(user === null, 'Прислан пустой результат, пользователь не залогинен');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Ввод неправильного логина', function (assert) {
        expect(4);

        auth.login(login+'1', pass, function(err, sessionKey){
            assert.ok(err === 'ERR_LOGIN', 'Ошибка входа');
            assert.ok(!sessionKey, 'Ключ сессии пустой');
            assert.ok(auth.isNew(), 'Backbone модель очистилась');
            assert.ok(!$.cookie('session_key'), 'куки удалились');
            QUnit.start();
        });
    });


    QUnit.asyncTest('Ввод неправильного пароля', function (assert) {
        expect(4);

        auth.login(login, pass + '1', function(err, sessionKey){
            assert.ok(err == 'ERR_LOGIN', 'Ошибка входа');
            assert.ok(auth.isNew(), 'Backbone модель очистилась');
            assert.ok(!sessionKey, 'Ключ сессии пустой');
            assert.ok(!$.cookie('session_key') , 'куки удалились');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Коректный вход', function (assert) {
        expect(4);

        auth.login('test', 'test', function(err, sessionKey, user){
            assert.ok(!err, 'Ошибок входе нет');
            assert.ok(sessionKey, 'Ключ сесии есть!');
            assert.ok(auth.get('name') == user.name, 'Backbone модель создана');
            assert.ok($.cookie('session_key') == sessionKey, 'куки установились!');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Проверка залогиненого пользователя', function (assert) {
        expect(2);

        auth.checkLogin(function(user){
            assert.ok(user.name == login, 'Объект пользователя пришел');
            assert.ok(auth.name == login, 'Модель создана');
            QUnit.start();
        });
    });

    QUnit.asyncTest('Разлогирование пользователя', function (assert) {
        expect(3);

        auth.logout(function(res){
            assert.ok(res === true, 'Успех при разлогировании');
            assert.ok(auth.isNew(), 'Backbone модель очистилась');
            assert.ok(!$.cookie('session_key'), 'куки удалились');
            QUnit.start();
        });
    });


});