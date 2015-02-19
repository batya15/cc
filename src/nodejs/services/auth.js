"use strict";

var dao = require('dao/daoAuth'),
    config = require('util/config'),
    crypto = require('crypto'),
    users = require("services/users");

var Auth = function () {};

Auth.prototype.login = function (login, password, ip, cb) {
    var hash = crypto.createHash('md5').update(password + config.get('salt')).digest('hex');
    dao.login(login, hash, function (err, user) {
        if (!err && user) {
            var current_date = (new Date()).valueOf().toString();
            var random = Math.random().toString();
            var sessionKey = crypto.createHash('md5').update(current_date + random).digest('hex');

            dao.sessionKey(crypto.createHash('md5').update(sessionKey+ip).digest('hex'), user.id, function () {
                users.getUserById(user.id, function (err, user) {
                    cb(err, sessionKey, user);
                });
            });

        } else {
            cb('ERROR_AUTH');
        }
    });

};

Auth.prototype.logout = function (hash, cb) {
    cb(true);
};


module.exports = new Auth();