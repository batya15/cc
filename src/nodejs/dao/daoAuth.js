"use strict";

var db = require("entity/db");

var SELECT_USER_BY_LOGIN_PASSWORD = "SELECT * FROM  `users` WHERE `login` = ? AND `password` = ? AND `blocked` = FALSE";
var SELECT_USER_BY_LOGIN = "SELECT * FROM  `users` WHERE `login` = ?";
var ADD_NEW_SESSION_KEY = "INSERT INTO `sessionKey` ( `sid` , `userId`) VALUES ( ?, ?);";
var SELECT_SESSION_KEY = "SELECT * FROM  `sessionKey` WHERE  `sid` = ? AND `date` > ? AND `blocked` = 0";

var LOG_LOGIN_USER = 'LOG_loginUser';

/**
 * Логирование попытки входа
 * @param data
 * @param cb
 */
module.exports.log = function (data, cb) {
    db.insert(LOG_LOGIN_USER, {
        login: data.login,
        ip: data.ip
    }, cb);
};

/**
 * Установить что текузий вход был неудачным
 * @param id
 * @param cb
 */
module.exports.setFailLogin = function (id, cb) {
    db.update(LOG_LOGIN_USER, {
        id: id,
        fail: true
    }, cb);
};

/**
 * Получение всех неудачных входов за определенный период
 * @param data
 * @param cb
 */
module.exports.getCountFail = function (data, cb) {
    db.count(LOG_LOGIN_USER, {
        login: data.login,
        dateTime: '>' + data.time,
        fail: true
    }, cb);
};

/**
 * Поиск userId по логину и хэшу
 * @param login
 * @param hash
 * @param ip
 * @param cb
 */
module.exports.getUserByLoginPassword = function (login, hash, ip, cb) {
    db.queryRow(SELECT_USER_BY_LOGIN_PASSWORD, [login, hash], function (err, row) {
        var result;
        if (row) {
            result = {
                id: row.id
            };
        }
        cb(err, result);
    });
};

/**
 * Добавление новой сессии к пользователю
 * @param hash
 * @param id
 * @param cb
 */
module.exports.sessionKey = function (hash, id, cb) {
    db.queryRow(ADD_NEW_SESSION_KEY, [hash, id], function (err, row) {
        cb(err, row);
    });
};

/**
 * Блокировка пользователя
 * @param login
 * @param cb
 */
module.exports.blockedUserByLogin = function (login, cb) {
    db.queryRow(SELECT_USER_BY_LOGIN, [login], function (err, row) {
        if (err) {
            cb(err, row);
        } else {
            db.update('users', {
                id: row.id,
                blocked: true
            }, function(err, res) {
                cb(err, res);
            });
        }
    });
};

/**
 * Получение id по SID
 * @param sid
 * @param timeLimit
 * @param cb
 */
module.exports.getUserIdBySID = function (sid, timeLimit, cb) {
    db.queryRow(SELECT_SESSION_KEY, [sid, timeLimit], function (err, row) {
        var result;
        if (row) {
            result = {
                userId: row.userId
            };
        }
        cb(err, result);
    });
};

/**
 * Блокирование старой сессии
 * @param sid
 * @param cb
 */
module.exports.logout = function (sid, cb) {
    db.update('sessionKey', {
        sid: sid,
        blocked: 1
    }, function() {
        cb(true);
    });
};

