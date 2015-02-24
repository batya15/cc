var crypto = require('crypto'),
    io = require('socket.io').listen(3030),
    cookieParser = require('socket.io-cookie'),
    auth = require('services/auth'),
    config = require('util/config');

io.use(cookieParser);


module.exports = function (namespace, notAuth) {
    var socket = io.of('/' + namespace);
    socket.use(function (client, next) {
        var ip  = client.handshake.address;
        var key = (client.request.headers.cookie)? client.request.headers.cookie['sessionKey']: '';

        auth.checkLoginBySID(ip, key, function (err, res) {
            if (res && !err) {
                client.handshake.userId = res.id;
                next();
            } else {
                if (notAuth) {
                    next();
                } else {
                    next(new Error('Auth'));
                }
            }
        });

    });
    return socket;
};