"use strict";

var socket = require("entity/socket")('ping', true);

socket.on('connection', function (socket) {

    socket.on('ping', function (cb) {
        cb('pong');
    });
});