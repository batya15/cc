"use strict";

//Сборщик для src/static + установка зависимостей для src/nodejs

var config = require('./gulp/config.json');
var gulp = require('gulp');
var install = require('gulp-install');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');

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
        .pipe(plumber())
        .pipe(gulp.dest(config.path.build));
}
//Компиляция стилей SCSS
function compileStyle () {
    return gulp.src(config.path.scssFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({quiet: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.build + '/static'));
}

gulp.task('development', gulp.series('clean',installModules, 'bower', copyStaticClientFiles, compileStyle));

gulp.task('release', gulp.series('development'));
gulp.task('default', gulp.series('development'));


