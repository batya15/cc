"use strict";

//Сборщик для src/static + установка зависимостей для src/nodejs

var config = require('./gulp/config.json');
var gulp = require('gulp');
var install = require('gulp-install');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var sass = require('gulp-sass');
var wrap = require('gulp-wrap-amd');
var jade = require('gulp-jade');
var rename = require('gulp-rename');
var path = require('path');
var async = require('async');
var through = require('through2');
var fs = require('fs');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');

//Копирование главных файлов BOWER в папку vendor
require('./gulp/bower')(gulp);
require('./gulp/jsHint')(gulp);
//Удаление папки билда
require('./gulp/clean')('clean', gulp, [config.path.build], config.path.src);
//Удаление папки билда и всех зависимостей npm и bower
require('./gulp/clean')('cleanHard', gulp, [config.path.build, config.path.bower_components_admin, config.path.bower_components_admin_vendor], config.path.src);
//Скачивание всех зависимостей
function installModules() {
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
function compileStyle() {
    return gulp.src(config.path.scssFiles)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({quiet: true}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.path.build + '/static'));
}
//Компиляция шаблонов JADE
function compileTemplates() {
    function scanJadeIncludes(jadeFileName, basePath, callback) {
        fs.readFile(jadeFileName, {"encoding": "utf-8"}, function (err, data) {
            if (err) {
                callback(err)
            } else {
                var res = [];
                var tasks = [];
                data = data.split("\n");
                data.forEach(function (line) {
                    line = line.trim().split(/\s+/);
                    if (line[0] == 'include') {
                        line = line[1];
                        if (line.indexOf('.jade') == -1) {
                            line += '.jade';
                        }
                        var fn = path.join(basePath, line);
                        res.push(fn);
                        line = path.join(path.dirname(jadeFileName), line);
                        tasks.push(function (cb) {
                            scanJadeIncludes(line, path.dirname(fn), cb);
                        })
                    }
                });
                async.parallel(tasks, function (err, cbres) {
                    if (err) {
                        console.log(err);
                    }
                    if (cbres && cbres.length) {
                        cbres.forEach(function (r) {
                            if (r && r.length) {
                                r.forEach(function (e) {
                                    if (e && e.length) {
                                        res.push(e);
                                    }
                                });
                            }
                        })
                    }
                    callback(err, res);
                })
            }
        });
    }

    return gulp.src(config.path.jadeFiles)
        .pipe(plumber())
        .pipe(jade({client: true, pretty: true}))
        .pipe(wrap({deps: ['vendor/runtime', '{cssIncludePlaceholder}'], params: ['jade']}))
        .pipe(through.obj(function (file, enc, cb) {
            var fn = file.history[0];
            fn = fn.split(path.sep);
            fn = fn[fn.length - 1];
            var css = fn.split('.');
            css[css.length - 1] = 'css';
            css = css.join('.');
            var cssArr = [css];
            var self = this;
            scanJadeIncludes(file.history[0], '.', function (err, res) {
                if (err) {
                    console.log(err);
                }
                if (res && res.length) {
                    res.forEach(function (fn) {
                        cssArr.push(fn.replace(/\.jade$/, '.css').replace(/\\/g, '/'));
                    });
                }
                // TODO: skip css files that absent in current directory with extention "scss"

                file.contents = new Buffer(String(file.contents)
                        .replace("{cssIncludePlaceholder}", 'css!./' + cssArr.join('","css!'))
                );
                self.push(file);
                cb();
            });
        }))
        .pipe(rename({extname: ".jade.js"}))
        .pipe(gulp.dest(config.path.build + '/static'));
}
//Компиляция статичных JADE HTML
function compileStaticTemplates() {
    return gulp.src(config.path.jadeHtmlFiles)
        .pipe(plumber())
        .pipe(jade({client: false, pretty: true}))
        .pipe(rename({extname: ""}))
        .pipe(gulp.dest(config.path.build + '/static'));
}
//Вотчеры
function registerWatchers() {
    livereload.listen();
    watch(config.staticFiles, {verbose: true, name: 'copy-changed-files'}, function (files, done) {
        return files.pipe(plumber())
            .pipe(gulp.dest(config.path.build))
            .pipe(livereload({auto: false}))
            .on('end', done);
    });
    watch(config.path.jadeFiles, {verbose: true, name: 'jade-compile-files'}, compileTemplates);
    watch(config.path.jadeHtmlFiles, {verbose: true, name: 'jade-static-compile-files'}, compileStaticTemplates);
    watch(config.path.scssFiles, {verbose: true, name: 'style-compile-files'}, compileStyle);
    return gulp;
}

gulp.task('build', gulp.series('clean', 'jsHint', installModules, 'bower', gulp.parallel(copyStaticClientFiles, compileStyle, compileTemplates, compileStaticTemplates)));
gulp.task('development', gulp.series('build', registerWatchers));

gulp.task('release', gulp.series('build'));
gulp.task('default', gulp.series('development'));


