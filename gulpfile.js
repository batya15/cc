"use strict";

var config = require('./gulp/config.json');
var gulp = require('gulp');
var clear = require('./gulp/clear');

gulp.task('default', gulp.series('clear'));

gulp.task('clear', function() {
    clear([config.path.build])
});

