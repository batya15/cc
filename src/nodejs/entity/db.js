"use strict";

var config = require('util/config').get('db'),
    mysql = require('mysql'),
    mysqlUtilities = require('mysql-utilities'),
    log = require("util/logger")(module);


var pool = mysql.createPool({
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_passw,
    database: config.db_name
});

mysqlUtilities.upgrade(pool);
mysqlUtilities.introspection(pool);

pool.on('connection', function () {
    log.info('Connect database MySQL');
});

pool.on('error', function(err){
    if(err.code == 'PROTOCOL_CONNECTION_LOST') {
        console.log('error');
    }
    else {
        throw err;
    }
});

module.exports = pool;