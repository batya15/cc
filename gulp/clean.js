"use strict";
var rimraf = require('rimraf');

module.exports = function(gulp, paths, src) {
    gulp.task('clean', function () {
        paths.forEach(function (val) {
            rimraf.sync(val);
        });
        return gulp.src(src);
    });
};