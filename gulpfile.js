const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass')); 

function htmlTask() {
  return src('src/index.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function scssTask() {
  return src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist/css'))
    .pipe(browserSync.stream());
}

function imageTask() {
  return src('src/img/**/*', {encoding: false})
    .pipe(dest('dist/img'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist',
    }
  });

  watch('src/index.html', htmlTask);
  watch('src/**/*.scss', scssTask); 
  watch('src/img/**/*', imageTask);
}

exports.default = series(htmlTask, scssTask, imageTask, serve);