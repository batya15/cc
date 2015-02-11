"use strict";

//Сборщик для static/admin + установка зависимостей для nodejs

var config = require('./gulp/config.json');
var gulp = require('gulp');
var install = require('gulp-install');

//Копирование главных файлов BOWER в папку vendor
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
//Копирование статичных файлов
function copyStaticClientFiles() {
    return gulp.src(config.staticFiles, {base: 'src'})
        .pipe(gulp.dest(config.path.build));
}

gulp.task('default', gulp.series('clean', installModules, 'bower', copyStaticClientFiles));


