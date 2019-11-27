'use strict';
var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');

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
    .on('end', function() {
      cb(mochaErr);
    });
});

gulp.task('watch', function() {
  gulp.watch(['generators/**/*.ts', 'test/**'], gulp.series('test'));
});

// TODO :  need to change it with npm's audit command or using synk
// gulp.task('prepublish');

gulp.task('ts', function() {
  return gulp
    .src(['generators/app/index.ts','generators/app/types.ts'])
    .pipe(tsProject());
});

gulp.task('default', gulp.series('ts', 'static', 'test'));
