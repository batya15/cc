"use strict";

var config = require('./gulp/config.json');
var gulp = require('gulp');

//Удаление папки билда
require('./gulp/clean')('clean', gulp, [config.path.build], config.path.src);
//Удаление папки билда и всех зависимостей npm и bower
require('./gulp/clean')('cleanHard', gulp, [config.path.build, config.path.bower_components_admin], config.path.src);

gulp.task('default', gulp.series('clean', installModules));


var install = require('gulp-install');
function installModules () {
    return gulp.src([config.path.src + '/nodejs/package.json', config.path.src + '/static/admin/bower.json'])
        .pipe(install());
}