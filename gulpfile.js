"use strict";

var config = require('./gulp/config.json');
var gulp = require('gulp');

require('./gulp/clean')(gulp, [config.path.build], config.path.src);

gulp.task('default', gulp.series('clean', installModules));


var install = require('gulp-install');
function installModules () {
    return gulp.src([config.path.src + '/nodejs/package.json', config.path.src + '/static/admin/bower.json'])
        .pipe(install());
}