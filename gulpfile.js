var gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-ruby-sass'),
  uglifycss = require('gulp-uglifycss');


gulp.task('concatServices', function() {
  gulp.src('app/js/services/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('services.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/build/'))
});

gulp.task('concatDirectives', function() {
  gulp.src('app/js/directives/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('directives.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/build/'))
});

gulp.task('concatControllers', function() {
  gulp.src('app/js/controllers/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('controllers.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js/build/'))
});

gulp.task('sass', function() {
  sass('app/scss/*.scss')
    .on('error', sass.logError)
    .pipe(concat('style.css'))
    .pipe(uglifycss({
      "maxLineLen": 80,
      "uglyComments": true
    }))
    .pipe(gulp.dest('app/css'))
});


gulp.task('default', ['sass', 'concatServices', 'concatDirectives', 'concatControllers'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/js/services/*.js', ['concatServices']);
  gulp.watch('app/js/directives/*.js', ['concatDirectives']);
  gulp.watch('app/js/controllers/*.js', ['concatControllers']);
})