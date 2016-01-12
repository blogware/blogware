var bootstrap = require('./bootstrap');

bootstrap();

var gulp = require('gulp');
var del = require('del');
var bs = require('browser-sync').create();
var app = require('./app');
var stream = require('./stream');

function clean() {
  return del('_site');
}

function traverse() {
  return gulp.src(['**/*', '!_site{,/**/*}'])
    .pipe(stream())
    .pipe(gulp.dest('_site'));
}

function live() {
  serve();
  watch();
}

function serve() {
  app.listen(4000, function() {
    bs.init({
      notify: false,
      plugins: ['bs-html-injector'],
      proxy: 'localhost:4000',
      ui: false
    });
  });
}

function watch() {
  gulp.watch(['**/*', '!_site{,/**/*}'], {})
    .on('all', function(event, path) {
      gulp.src(path)
        .pipe(stream())
        .pipe(gulp.dest('_site'))
        .on('finish', bs.reload);
    });
}

gulp.task('serve', gulp.series(clean, traverse, live));
