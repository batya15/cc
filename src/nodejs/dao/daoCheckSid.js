"use strict";

var db = require("entity/db");

var SELECT_SESSION_KEY = "SELECT * FROM  `sessionKey` WHERE  `sid` = ?";

function daoCheckSid (sid, cb) {
    db.queryRow(SELECT_SESSION_KEY, [sid], function (err, row) {
        var result;
        if (row) {
            result = {
                userId: row.userId
            };
        }
        cb(err, result);
    });
}

module.exports = daoCheckSid;