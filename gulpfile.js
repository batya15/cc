"use strict";

var config = require('./gulp/config.json');
var gulp = require('gulp');
var install = require('gulp-install');
var mainBowerFiles = require('main-bower-files');
var gulpFilter = require('gulp-filter');

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
function bowerJs() {
    var filter = gulpFilter('*.js');
    return gulp
        .src(mainBowerFiles({paths: config.path.staticAdmin}))
        .pipe(filter)
        .pipe(gulp.dest(config.path.staticAdmin + '/vendor/js'));
}

function bowerCss() {
    var filter = gulpFilter('*.css');
    return gulp
        .src(mainBowerFiles({paths: config.path.staticAdmin}))
        .pipe(filter)
        .pipe(gulp.dest(config.path.staticAdmin + '/vendor/css'));
}

function bowerFonts() {
    var filter = gulpFilter(['*.eot', '*.svg', '*.ttf', '*.woff']);
    return gulp
        .src(mainBowerFiles({paths: config.path.staticAdmin}))
        .pipe(filter)
        .pipe(gulp.dest(config.path.staticAdmin + '/vendor/fonts'));
}

gulp.task('bower', gulp.series(bowerJs, bowerCss, bowerFonts));

gulp.task('default', gulp.series('clean', installModules, 'bower'));


