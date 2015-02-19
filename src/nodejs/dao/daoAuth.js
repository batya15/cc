"use strict";

var db = require("entity/db");

var SELECT_USER_BY_LOGIN_PASSWORD = "SELECT * FROM  `users` WHERE `login` = ? AND  `password` = ?";
var ADD_NEW_SESSION_KEY = "INSERT INTO `sessionKey` ( `sid` , `userId`) VALUES ( ?, ?);";


module.exports.login = function (login, hash, cb) {
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

