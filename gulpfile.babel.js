'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');

const stylus = require('gulp-stylus');
const del = require('del');
const autoprefixer = require('autoprefixer');
const lost = require('lost');
const postcss = require('gulp-postcss');


/*========== HTML ==========*/
gulp.task('html', () => 
    gulp.src('src/*.html')
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
);

/*========== CSS ==========*/
gulp.task('css', function() {
    var processors = [
        autoprefixer({browsers: ['last 2 version']}),
        lost
    ];
    return gulp.src('src/*.styl')
    .pipe(stylus())
    .pipe(postcss(processors))
    .pipe(gulp.dest('dist/'))
    .pipe(browserSync.stream())
});

/*========== JS ==========*/
gulp.task('transpile-js', () => {
    gulp.src('./src/*.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
});


/*==========  Static Server ==========*/
gulp.task('browser-sync', () => { 
    browserSync.init({
      server: {
        baseDir: "./dist"
      },
      notify: false,
      open: false
    });

    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/*.styl', ['css']);
    gulp.watch('./src/*.js', ['transpile-js']);
});

/*==========  Default Task ==========*/
gulp.task('default', [
  'html',
  'css',
  'transpile-js',
  'browser-sync'
]);