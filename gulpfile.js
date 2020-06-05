// Taskrunner Gulp
const gulp = require('gulp');

const indexPage = 'src/index.html';
const styles = 'src/styles/styles.css';

//
// Build Workflow
//
function buildStyles() {
  const postcss = require('gulp-postcss');

  return gulp.src(styles)
    .pipe(postcss([
      require('tailwindcss')
    ]))
    .pipe(gulp.dest('dist/css'));
}

function buildIndexPage() {
  const inject = require('gulp-inject');

  const styleSheet = gulp.src('dist/css/styles.css', {read: false});

  return gulp.src(indexPage)
    .pipe(inject(styleSheet, {ignorePath: 'dist/', removeTags: true, addRootSlash: false}))
    .pipe(gulp.dest('dist'));
}

const buildSampleApp = gulp.series(buildStyles, buildIndexPage);

//
// Development Workflow
//

function watchIndexPage() {
  return gulp.watch([indexPage, styles], buildSampleApp);
}

function serveDistFolder(done) {
  const browserSync = require('browser-sync');

  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    watch: true
  });
  done();

}

const devWorkflow = gulp.series(buildSampleApp, serveDistFolder, watchIndexPage);

// Tasks export
exports.default = buildSampleApp;
exports.dev = devWorkflow;
