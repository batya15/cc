"use strict";

var db = require("entity/db");

var SELECT_SESSION_KEY = "SELECT * FROM  `sessionKey` WHERE  `sid` = ? AND `date` > ?";

function daoCheckSid (sid, timeLimit, cb) {
    console.log(timeLimit);
    db.queryRow(SELECT_SESSION_KEY, [sid, timeLimit], function (err, row) {
        console.log(row);
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