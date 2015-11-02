/*
1. Install gulp globally:
npm install --global gulp
2. Type the following after navigating to your project folder: npm install
5. Type 'gulp' and start developing
*/

'use strict';

process.env.NODE_ENV = 'development';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    browserSync = require('browser-sync'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    Server = require('karma').Server,
    protractor = require('gulp-protractor').protractor,
    reload = browserSync.reload,
    outputDir = '',
    sassStyle = '',
    scriptsToProcess = [],
    env = process.env.NODE_ENV || 'production';

/* Setup the config for this file depending on the environment */
if (env === 'development') {
    outputDir = 'build/';
    sassStyle = 'expanded';
    scriptsToProcess = ['js/vendor/*.js', 'js/app.js', 'js/modules/*.js', 'js/controllers/*.js', 'js/services/*.js', 'js/filters/*.js'];
} else {
    outputDir = 'build/';
    sassStyle = 'compressed';
    scriptsToProcess = ['js/vendor/*.js', 'js/app.js', 'js/modules/*.js', 'js/controllers/*.js'];
}

/* Scripts task */
gulp.task('scripts', function () {
    return gulp.src(scriptsToProcess)
        .pipe(plumber())
        .pipe(concat('app.min.js'))
        .pipe(babel())
        .pipe(gulpif(env === 'production', uglify()))
        .pipe(gulp.dest(outputDir + 'js'));
});

/* Sass task */
gulp.task('sass', function () {
    return gulp.src('scss/app.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulpif(env === 'production', minifycss()))
        .pipe(gulp.dest(outputDir + 'css'));
});

/* Reload task */
gulp.task('bs-reload', function () {
    browserSync.reload();
});

/* Prepare Browser-sync for localhost */
gulp.task('browser-sync', function () {
    browserSync.init([outputDir + 'css/*.css', outputDir + 'js/*.js'], {
        server: {
            baseDir: './'
        }
    });
});

/* Unit tests task */
gulp.task('unit-tests', function (done) {
  new Server({
    configFile: require('path').resolve('karma.conf.js'),
    singleRun: true
  }, done).start();
});

/* End to end tests task */
gulp.task('e2e-tests', function (done) {
    gulp.src(["test/e2e/**/*.js"])
        .pipe(protractor({
            configFile: "protractor.config.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function(e) { throw e })
});

/* Watch scss, js and html files */
gulp.task('default', ['browser-sync'], function () {
    gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch(['js/**/*.js'], ['scripts']);
    gulp.watch(['*.html'], ['bs-reload']);
});
