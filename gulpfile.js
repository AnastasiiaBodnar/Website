const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();

function htmlTask() {
  return src('src/index.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function cssTask() {
  return src('src/style.css')
    .pipe(dest('dist'))
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
  watch('src/style.css', cssTask);
  watch('src/img/**/*', imageTask);
}

exports.default = series(htmlTask, cssTask, imageTask, serve);
