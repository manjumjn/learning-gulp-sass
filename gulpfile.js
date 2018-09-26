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
    sass = require('gulp-sass');


 


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
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browser.stream()); //for browser reloading
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





/** ---------------------------------------------------------------------------
 * The main task.
 * ------------------------------------------------------------------------- */

 gulp.task('default', ['html', 'sass', 'server']);