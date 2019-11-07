'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var plumber = require('gulp-plumber');
var coveralls = require('gulp-coveralls');

gulp.task('static', function() {
  return gulp
    .src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('pre-test', function() {
  return gulp.src('generators/**/*.js');
});

gulp.task('test', gulp.series('pre-test'), function(cb) {
  var mochaErr;

  gulp
    .src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({ reporter: 'spec' }))
    .on('error', function(err) {
      mochaErr = err;
    })
    .pipe(istanbul.writeReports())
    .on('end', function() {
      cb(mochaErr);
    });
});

gulp.task('watch', function() {
  gulp.watch(['generators/**/*.js', 'test/**'], gulp.series('test'));
});

gulp.task('coveralls', gulp.series('test'), function() {
  if (!process.env.CI) {
    return;
  }

  return gulp.src(path.join(__dirname, 'coverage/lcov.info')).pipe(coveralls());
});

// TODO :  need to change it with npm's audit command or using synk
// gulp.task('prepublish');

gulp.task('default', gulp.series('static', 'test', 'coveralls'));
