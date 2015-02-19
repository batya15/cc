"use strict";

var dao = require('dao/daoUsers'),
    crypto = require('crypto'),
    mailer = require('services/mailer');

var Users = function () {
};

Users.prototype.getSchemeEditor = function () {
    return {
        'login': '',
        'name': '',
        'lastname': '',
        'avatar': {
            type: 'file',
            srcPath: 'user'
        },
        'photos': {
            type: 'files'
        },
        'phone': '',
        'email': '',
        'description': {
            type: 'textarea'
        }
    };
};

Users.prototype.getUserById = function (id, cb) {
    dao.getUserById(id, function (err, user) {
        cb(err, user);
    });
};

Users.prototype.getAllUsers = function (cb) {
    dao.getAllUsers(function (err, users) {
        cb(err, users);
    });
};

Users.prototype.createUser = function (data, cb) {
    dao.createUser(data, function (err, id) {
        cb(err, id);
    });
};

Users.prototype.updateUser = function (data, cb) {
    dao.updateUser(data, function (err, user) {
        cb(err, data);
    });
};

Users.prototype.deleteUser = function (data, cb) {
    dao.deleteUser(data, function (err, user) {
        cb(err, user);
    });
};

Users.prototype.resetPassword = function (id, cb) {
    var current_date = (new Date()).valueOf().toString();
    var random = Math.random().toString();
    var hash = crypto.createHash('md5').update(current_date + random).digest('hex');

    dao.resetPassword(id, hash, function (err, res) {
        if (err) {
            return cb(err, res);
        }
        dao.getUserById(id, function (err, res) {
            if (err) {
                return cb(err, res);
            }
            mailer.sendMail(res.email, 'recoveryPassword', {link: hash});
            cb(err, res);
        });
    });
};

module.exports = new Users();
