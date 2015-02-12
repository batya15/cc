"use strict";
define(['vendor/js/socket.io'], function (io) {
    return function (namespace) {
        return io('/' + namespace, {transports: ['websocket']});
    };
});