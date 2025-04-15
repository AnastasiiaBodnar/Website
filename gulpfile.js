const { src, dest, watch, series } = require('gulp');
const browserSync = require('browser-sync').create();

function htmlTask() {
  return src('index.html')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function cssTask() {
  return src('style.css')
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function imageTask() {
  return src('background.png', { allowEmpty: true })
    .pipe(dest('dist'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    }
  });

  watch('index.html', htmlTask);
  watch('style.css', cssTask);
  watch('background.png', imageTask); 
}

exports.default = series(htmlTask, cssTask, imageTask, serve);
