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
  bs.init({
    notify: false,
    ui: false,
    plugins: ['bs-html-injector'],
    server: { baseDir: '_site' },
    middleware: [app]
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
