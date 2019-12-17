const gulp = require('gulp');
const eslint = require('gulp-eslint');
const excludeGitignore = require('gulp-exclude-gitignore');

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

gulp.task('watch', function() {
  gulp.watch(['generators/**/*.ts', 'test/**'], gulp.series('test'));
});

gulp.task('build', gulp.series('static'));
