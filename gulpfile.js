var gulp = require('gulp'),
    uglify = require('gulp-uglify');

//scripts task
//uglifies
gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

//styles task
//uglifies
gulp.task('styles', function(){
    console.log('run styles');
});

//this task is responsible for executing all the tasks
gulp.task('default', ['scripts', 'styles']);

//to run the specific gulpfile simple type 'gulp [filename]' e.g gulp scripts
// to run all the tasks just type 'gulp'