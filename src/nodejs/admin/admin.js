"use strict";
var config = require("util/config");
var log = require("util/logger")(module);

var auth = require('./api/auth');
var users = require('./api/users');
var ping = require('./api/ping');

log.info("***START ADMINISTRATION SERVER***");