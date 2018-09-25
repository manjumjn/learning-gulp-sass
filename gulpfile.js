var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    livereload = require('gulp-livereload'),
    imagemin = require('gulp-imagemin'),
    prefix = require('gulp-autoprefixer');

function errorLog(error){
    console.error.bind(error);
    this.emit('end');
}

//scripts task
//uglifies
gulp.task('scripts', function(){
    gulp.src('js/*.js')
    .on('error', errorLog)
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

//styles task
//uglifies
gulp.task('styles', function(){
    return sass('css/*.scss')
    .pipe(sass({
        style: 'expanded'
    }))
    .on('error', errorLog)
    .pipe(prefix('lastt 2 versions'))
    .pipe(gulp.dest('css/'))
    .pipe(livereload());
});

//image task
//compress
gulp.task('image', function(){
    gulp.src('images/*')
        .on('error', errorLog)
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
});

//watch task
//watches js and then run 'scripts' task
gulp.task('watch', function(){

    var server = livereload();

    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('css/*.scss', ['styles']);
});

//this task is responsible for executing all the tasks
gulp.task('default', ['scripts', 'styles', 'watch']);