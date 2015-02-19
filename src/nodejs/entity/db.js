"use strict";

var config = require('util/config').get('db'),
    mysql = require('mysql'),
    mysqlUtilities = require('mysql-utilities');

var db =  function () {
    var pool = mysql.createPool({
        host: config.db_host,
        port: config.db_port,
        user: config.db_user,
        password: config.db_passw,
        database: config.db_name
    });

    mysqlUtilities.upgrade(pool);
    mysqlUtilities.introspection(pool);

    return pool;
};

module.exports = new db();