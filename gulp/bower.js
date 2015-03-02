"use strict";
var mainBowerFiles = require('main-bower-files');
var gulpFilter = require('gulp-filter');
var config = require('./config.json');

module.exports = function(gulp, paths, src) {
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
        var filter = gulpFilter(['*.eot', '*.svg', '*.ttf', '*.woff', '*.woff2']); 
        return gulp
            .src(mainBowerFiles({paths: config.path.staticAdmin}))
            .pipe(filter)
            .pipe(gulp.dest(config.path.staticAdmin + '/vendor/fonts'));
    }

    return gulp.task('bower', gulp.series(bowerJs, bowerCss, bowerFonts));

};