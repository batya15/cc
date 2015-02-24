"use strict";

var db = require("entity/db");

var SELECT_USER_BY_LOGIN_PASSWORD = "SELECT * FROM  `users` WHERE `login` = ? AND  `password` = ?";
var SELECT_USER_BY_LOGIN = "SELECT * FROM  `users` WHERE `login` = ?";
var ADD_NEW_SESSION_KEY = "INSERT INTO `sessionKey` ( `sid` , `userId`) VALUES ( ?, ?);";


module.exports.log = function (data, cb) {
    db.insert('LOG_loginUser', {
        login: data.login,
        ip: data.ip
    }, cb);
};

module.exports.setFailLogin = function (id, cb) {
    db.update('LOG_loginUser', {
        id: id,
        fail: true
    }, cb);
};

module.exports.getCountFail = function (data, cb) {
    db.count('LOG_loginUser', {
        login: data.login,
        dateTime: '>' + data.time,
        fail: true
    }, cb);
};

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

module.exports.sessionKey = function (hash, id, cb) {
    db.queryRow(ADD_NEW_SESSION_KEY, [hash, id], function (err, row) {
        var result;
        cb(err, result);
    });
};

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
