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
    browser = require('browser-sync').create();


 


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

});

// Copies HTML from src to dist.
gulp.task('html', function() {
    return gulp
        .src('src/*.html')
        .pipe(gulp.dest('dist'));
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

 gulp.task('default', ['server']);