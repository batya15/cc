"use strict";
var dao = require('dao/daoCheckSid');

var checkSid = function (sid, timeLimit, cb) {
    console.log(sid, timeLimit);
    dao(sid, timeLimit, function (err, data) {
            cb.apply(this, arguments);
    });
};

module.exports = checkSid;