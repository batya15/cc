"use strict";

var config = require('./gulp/config.json');
var gulp = require('gulp');
var install = require('gulp-install');
var mainBowerFiles = require('main-bower-files');
var ifElse = require('gulp-if-else');
var path = require('path');
var through = require('through2');

//Удаление папки билда
require('./gulp/clean')('clean', gulp, [config.path.build], config.path.src);
//Удаление папки билда и всех зависимостей npm и bower
require('./gulp/clean')('cleanHard', gulp, [config.path.build, config.path.bower_components_admin, config.path.bower_components_admin_vendor], config.path.src);
//Скачивание всех зависимостей
function installModules () {
    return gulp.src([config.modules.package, config.modules.admin_bower])
        .pipe(install());
}
//Копирование Main Bower файлов
function copyBower() {
    return gulp
        .src(mainBowerFiles({paths: config.path.staticAdmin}))
        .pipe(gulp.dest(config.path.staticAdmin + '/vendor'));
}


gulp.task('default', gulp.series('clean', copyBower));


