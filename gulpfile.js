// Taskrunner Gulp
const gulp = require('gulp');

function buildStyles() {
  const postcss = require('gulp-postcss');

  return gulp.src('src/styles/styles.css')
    .pipe(postcss([
      require('tailwindcss')
    ]))
    .pipe(gulp.dest('dist/css'));
}

function buildIndexPage() {
  const inject = require('gulp-inject');

  const styleSheet = gulp.src('dist/css/styles.css', {read: false});

  return gulp.src('src/index.html')
    .pipe(inject(styleSheet, {ignorePath: 'dist/', removeTags: true, addRootSlash: false}))
    .pipe(gulp.dest('dist'));
}

exports.default = gulp.series(buildStyles, buildIndexPage);
