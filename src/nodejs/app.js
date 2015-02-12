"use strict";
var io = require('socket.io').listen(3030);
var sockets = io.of('/ping');

sockets.on('connection', function (socket) {
    socket.on('ping', function(cb) {
        cb('pong');
    });
});