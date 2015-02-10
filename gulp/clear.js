"use strict";
var rimraf = require('rimraf');
var gulp = require('gulp');

module.exports = function (paths) {
    paths.forEach(function (val) {
        rimraf.sync(val);
    });
};