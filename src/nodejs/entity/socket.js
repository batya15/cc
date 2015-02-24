var crypto = require('crypto'),
    io = require('socket.io').listen(3030),
    cookieParser = require('socket.io-cookie'),
    checkSid = require('services/checkSid'),
    config = require('util/config');

io.use(cookieParser);

function twoDigits(d) {
    if(0 <= d && d < 10) {
        return "0" + d.toString();
    }
    if(-10 < d && d < 0) {
        return "-0" + (-1*d).toString();
    }
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getFullYear() + "-" + twoDigits(1 + this.getMonth()) + "-" + twoDigits(this.getDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getMinutes()) + ":" + twoDigits(this.getSeconds());
};



module.exports = function (namespace, notAuth) {
    var socket = io.of('/' + namespace);
    socket.use(function (client, next) {
        var key = (client.request.headers.cookie) ? client.request.headers.cookie['sessionKey'] : '';
        var ip = client.handshake.address,
            sid = crypto.createHash('md5').update(key + ip).digest('hex');

        var limitTime = new Date(Date.now() - config.get('sidTime')).toMysqlFormat();
        checkSid.call(this, sid, limitTime, function (err, res) {
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