/** ===========================================================================
 *
 * Gulp configuration file.
 *
 * ========================================================================= */




 'use strict';



 
/** ---------------------------------------------------------------------------
 * Load plugins.
 * ------------------------------------------------------------------------- */

var gulp = require('gulp'),
    browser = require('browser-sync').create(),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    minifyJS = require('gulp-uglify'),
    concatJS = require('gulp-concat'),
    jshint = require('gulp-jshint');


 


/** ---------------------------------------------------------------------------
 * Regular tasks.
 * ------------------------------------------------------------------------- */

// Create a server with BrowserSync and watch for file changes.
gulp.task('server', function() {
    browser.init({
        // Inject CSS changes without the page being reloaded.
        injectChanges: true,

        // What to serve.
        server: {
            baseDir: "dist"
        },

        // The port.
        port: 1234

        // For a complete list of options, visit: https://www.browsersync.io/docs/options
    });

    // Watch for file changes.
    gulp.watch('src/*.html', ['watch-html']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch('src/js/lib/**/*.js', ['watch-js']);
});

// Copies HTML from src to dist.
gulp.task('html', function() {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// Compiles Sass to CSS.
gulp.task('sass', function() {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe(sass({
            // Sass related options go here.
            // See more options here: https://github.com/sass/node-sass#options
            outputStyle: 'expanded' //use 'compressed' to minify css
        }))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'ie 6-8']
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browser.stream()); //for browser reloading
});

// Concatenate and minify JS.
gulp.task('js', ['lint-js'], function() {
    return gulp
        .src('src/js/lib/**/*.js')
        .pipe(concatJS('scripts.js'))
        .pipe(minifyJS({
            // For options visit: https://github.com/mishoo/UglifyJS2#minify-options
        }))
        .pipe(gulp.dest('dist/js'));
});

// Check JS code for errors.
gulp.task('lint-js', function() {
    return gulp
        .src('src/js/lib/**/*.js')
        .pipe(jshint()) // gulp jshint plugin requires normal npm jshint plugin to be installed
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail')); // task fails on JSHint error; 
});





/** ---------------------------------------------------------------------------
 * Watch tasks.
 * ------------------------------------------------------------------------- */

// HTML.
// this is 'watch-html' task but run it after you run the 'html' task
gulp.task('watch-html', ['html'], function(done) {
    browser.reload();
    done();
});

// JS.
gulp.task('watch-js', ['js'], function(done) {
    browser.reload();
    done();
});



/** ---------------------------------------------------------------------------
 * The main task.
 * ------------------------------------------------------------------------- */

 gulp.task('default', ['html', 'sass', 'server']);