"use strict";

var socket = require("entity/socket")('users'),
    users = require("services/users");

var scheme = users.getSchemeEditor();

socket.on('connection', function (client) {

    users.getAllUsers(function(err, users) {
        if (!err) {
            client.emit('modelList', users, scheme);
        }
    });

    client.on('create', function(data, cb) {
        users.createUser(data, function (err, id) {
            if (!err) {
                users.getUserById(id, function(err, res) {
                    client.broadcast.emit('model', res);
                    cb(err, res);
                });
            }

        });
    });

    client.on('update', function(data, cb) {
        users.updateUser(data, function (err, result) {
            if (!err) {
                client.broadcast.emit('model', data);
            }
            cb(err, data);
        });
    });

    client.on('delete', function(id, cb) {
        users.deleteUser(id, function (err, result) {
            if (!err) {
                client.broadcast.emit('delete', {id: id});
            }
            cb(err, {id: id});
        });
    });

    client.on('resetPassword', function(data, cb) {
        users.resetPassword(data.id, function (err, result) {
            cb(err, result);
        });
    });

});
