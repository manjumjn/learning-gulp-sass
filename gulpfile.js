var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass');

//scripts task
//uglifies
gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

//styles task
//uglifies

//this technique is deprecated
// gulp.task('styles', function(){
//     gulp.src('css/*.scss')
//     .pipe(sass({
//         style: 'compressed'
//     }))
//     .pipe(gulp.dest('css/'));
// });

gulp.task('styles', function(){
    return sass('css/*.scss')
    .on('error', sass.logError)
    .pipe(gulp.dest('css/'));
});

//watch task
//watches js and then run 'scripts' task
gulp.task('watch', function(){
    gulp.watch('js/*.js', ['scripts']);

    //if any .scss file is modified run 'styles' task
    gulp.watch('css/*.scss', ['styles']);
});

//this task is responsible for executing all the tasks
gulp.task('default', ['scripts', 'styles', 'watch']);

//to run the specific gulpfile simple type 'gulp [filename]' e.g gulp scripts
// to run all the tasks just type 'gulp'