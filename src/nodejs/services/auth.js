"use strict";

var dao = require('dao/daoAuth'),
    config = require('util/config'),
    crypto = require('crypto'),
    users = require("services/users"),
    checkSid = require("services/checkSid");

var Auth = function () {};

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}

function twoDigits(d) {
    if(0 <= d && d < 10) {
        return "0" + d.toString();
    }
    if(-10 < d && d < 0) {
        return "-0" + (-1*d).toString();
    }
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
};

Auth.prototype.login = function (login, password, ip, cb) {
    dao.log({login: login, ip: ip}, function(err, idLog) {
        var hash = md5(password + config.get('salt'));
        dao.getUserByLoginPassword(login, hash, ip, function (err, user) {
            if (!err && user) {
                var current_date = (new Date()).valueOf().toString();
                var random = Math.random().toString();
                var sessionKey = md5(current_date + random);

                dao.sessionKey(md5(sessionKey+ip), user.id, function () {
                    users.getUserById(user.id, function (err, user) {
                        cb(err, sessionKey, user);
                    });
                });

            } else {
                dao.setFailLogin(idLog, function(){
                    var lastTime = new Date(Date.now() - config.get('blocked').time).toMysqlFormat();
                    var r = new Date();
                    console.log(lastTime, r);
                    dao.getCountFail({
                        time: lastTime,
                        login: login
                    }, function(err, res) {
                        if (err || res > config.get('blocked').attempt) {
                            dao.blockedUserByLogin(login, function() {
                                cb('ERROR_AUTH');
                            });
                        } else {
                            cb('ERROR_AUTH');
                        }
                    });
                });
            }
        });
    });
};

Auth.prototype.logout = function (hash, cb) {
    cb(true);
};

Auth.prototype.checkLogin = function (ip, key, cb) {
    var sid = md5(key + ip),
        limitTime = new Date(Date.now() - config.get('sidTime')).toMysqlFormat();
    checkSid(sid, limitTime, function (err, res) {
        if (!err && res) {
            users.getUserById(res.userId, function (err, user) {
                cb(err, user);
            });
        } else {
            cb(new Error('FAIL SID'), res);
        }
    });
};


module.exports = new Auth();