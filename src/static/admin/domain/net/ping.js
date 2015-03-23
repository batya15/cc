"use strict";
define(['domain/entity/socket'], function (io) {
    var socket = io('ping');

    return function (cb) {
            socket.emit('ping', function (data) {
                cb(data);
            });
        };
});