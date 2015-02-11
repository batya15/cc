"use strict";

var config = require('./gulp/config.json');
var gulp = require('gulp');
var install = require('gulp-install');

require('./gulp/bower')(gulp);
//Удаление папки билда
require('./gulp/clean')('clean', gulp, [config.path.build], config.path.src);
//Удаление папки билда и всех зависимостей npm и bower
require('./gulp/clean')('cleanHard', gulp, [config.path.build, config.path.bower_components_admin, config.path.bower_components_admin_vendor], config.path.src);
//Скачивание всех зависимостей
function installModules () {
    return gulp.src([config.modules.package, config.modules.admin_bower])
        .pipe(install());
}


gulp.task('default', gulp.series('clean', installModules, 'bower'));


