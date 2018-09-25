var gulp = require('gulp'),
    uglify = require('gulp-uglify');

//'default' is a task name
//minifying js files and saving them in minjs folder
gulp.task('default', function(){
    console.log('Hello Gulp');

    //loading the files and save them to minjs
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('minjs'));
});

//to run the gulpfile simple type 'gulp' in console, it will automatically look for gulp file and run a task