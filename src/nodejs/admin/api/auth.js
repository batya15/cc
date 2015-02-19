"use strict";

var socket = require("entity/socket")('auth', true),
    auth = require("services/auth"),
    users = require("services/users");

socket.on('connection', function (socket) {

    if (socket.handshake.hasOwnProperty('userId')) {
        users.getUserById(socket.handshake.userId, function (err, user) {
            socket.emit('user', null, user);
        });
    } else {
        socket.emit('user', new Error('Auth'));
    }

    socket.on('login', function(data, cb) {
        var ip  = socket.handshake.address;
        auth.login(data.login, data.password, ip, cb);
    });

    socket.on('logout', function(cb) {
        auth.logout(socket.request.headers.cookie['sessionKey'], cb);
    });


});