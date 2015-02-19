var crypto = require('crypto');
var io = require('socket.io').listen(3030);
var cookieParser = require('socket.io-cookie');
var checkSid = require('services/checkSid');

io.use(cookieParser);

module.exports = function(namespace, notAuth) {
    var socket = io.of('/' + namespace);
    socket.use(function(client, next) {
        var key = (client.request.headers.cookie)? client.request.headers.cookie['sessionKey']: '';
        var ip  = client.handshake.address,
            sid = crypto.createHash('md5').update(key + ip).digest('hex');

        checkSid.call(this, sid, function(err, res) {
            if (res && !err) {
                client.handshake.userId = res.userId;
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