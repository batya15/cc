"use strict";

var dao = require('dao/daoAuth'),
    config = require('util/config'),
    crypto = require('crypto'),
    users = require("services/users");

var Auth = function () {};

function md5(string) {
    return crypto.createHash('md5').update(string).digest('hex');
}
Date.prototype.toMysqlFormat = function() {
    function twoDigits(d) {
        if(0 <= d && d < 10) {
            return "0" + d.toString();
        }
        if(-10 < d && d < 0) {
            return "-0" + (-1*d).toString();
        }
        return d.toString();
    }
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

Auth.prototype.logout = function (ip, sidClient, cb) {
    var sid = md5(sidClient + ip);
    dao.logout(sid, cb);
};

Auth.prototype.checkLoginBySID = function (ip, sidClient, cb) {
    var sid = md5(sidClient + ip),
        limitTime = new Date(Date.now() - config.get('sidTime')).toMysqlFormat();
    dao.getUserIdBySID(sid, limitTime, function (err, res) {
        if (!err && res) {
            users.getUserById(res.userId, function (err, user) {
                if (err || user.blocked) {
                    cb(new Error('FAIL SID'), null);
                } else {
                    cb(err, user);
                }
            });
        } else {
            cb(new Error('FAIL SID'), null);
        }
    });
};


module.exports = new Auth();