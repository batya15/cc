"use strict";

var db = require("entity/db");
var util = require('util');

var SELECT_USER_BY_ID = "SELECT * FROM  `users` WHERE  `id` = ?";
var DELETE_USER_BY_ID = "DELETE FROM `users` WHERE `users`.`id` = ?;";
var RESET_PASSWORD_BY_ID = "UPDATE `users` SET  `password` =  '', `resetHash` =  ?, `resetDate` =  ? WHERE  `users`.`id` = ?;";
var SELECT_ALL_USERS = "SELECT * FROM `users`;";

var excludeFieldMask = ['password', 'resetHash', 'resetDate'];

function excludeField(obj) {
    if (util.isArray(obj)) {
        obj.forEach(excludeField);
    } else if (typeof obj == 'object') {
        excludeFieldMask.forEach(function (val) {
            delete obj[val];
        });
    }
}

var DaoUsers = function () {
    this.name = 'DaoUsers';
};

/**
 * Получение информации о пользователе по ID
 * @param id
 * @param cb
 */
DaoUsers.prototype.getUserById = function (id, cb) {
    db.queryRow(SELECT_USER_BY_ID, [id], function (err, row) {
        excludeField(row);
        cb(err, row);
    });
};

/**
 * Получение всех пользователей
 * @param cb
 */
DaoUsers.prototype.getAllUsers = function (cb) {
    db.query(SELECT_ALL_USERS, function (err, row) {
        excludeField(row);
        cb(err, row);
    });
};

DaoUsers.prototype.createUser = function (data, cb) {
    db.insert('users', data, cb);
};

DaoUsers.prototype.updateUser = function (data, cb) {
    db.update('users', data, cb);

};

DaoUsers.prototype.deleteUser = function (data, cb) {
    db.query(DELETE_USER_BY_ID, [data.id], function (err, row) {
        cb(err, row);
    });
};

DaoUsers.prototype.resetPassword = function (id, hash, cb) {
    var currentDate = new Date();
    db.query(RESET_PASSWORD_BY_ID, [hash, currentDate, id], function (err, row) {
        cb(err, row);
    });
};

module.exports = new DaoUsers();