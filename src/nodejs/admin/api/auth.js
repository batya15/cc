"use strict";

var socket = require("entity/socket")('auth', true),
    auth = require("services/auth"),
    users = require("services/users");

socket.on('connection', function (socket) {

    socket.on('login', function(data, cb) {
        var ip  = socket.handshake.address;
        auth.login(data.login, data.password, ip, cb);
    });

    socket.on('checkLogin', function(cb) {
        var ip  = socket.handshake.address;
        var key = (socket.request.headers.cookie)? socket.request.headers.cookie['sessionKey']: '';
        auth.checkLoginBySID(ip, key, cb);
    });

    socket.on('logout', function(cb) {
        var ip  = socket.handshake.address;
        var key = (socket.request.headers.cookie)? socket.request.headers.cookie['sessionKey']: '';
        auth.logout(ip, key, cb);
    });


});