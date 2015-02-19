"use strict";
var dao = require('dao/daoCheckSid');

var checkSid = function (sid, cb) {
    dao(sid, function (err, data) {
            cb.apply(this, arguments);
    });
};

module.exports = checkSid;