var bootstrap = require('./bootstrap');

bootstrap();

var resolve = require('path').resolve;
var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var del = require('del');
var bs = require('browser-sync').create();
var app = require('./app');
var stream = require('./stream');
var table = require('./table');

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
  gulp.watch(['**/*', '!_site{,/**/*}'], {}).on('all', handler);
}

function handler(event, path) {
  var src;

  if (event === 'unlink') {
    src = through.obj();
    var file = new gutil.File({ path: resolve(path) });
    file.__event = event;
    src.end(file);
  }

  if (event === 'unlinkDir') {
    src = through.obj();
    table.record.all().forEach(function(key) {
      if (key.indexOf(path) === 0) {
        var file = new gutil.File({ path: resolve(key) });
        file.__event = 'unlink';
        src.write(file);
      }
    });
    src.end();
  }

  if (event === 'addDir') {
    src = gulp.src(path + '/**/*');
  }

  src = src || gulp.src(path);

  var dest;

  dest = gulp.dest('_site');
  dest.on('finish', bs.reload);

  src
    .pipe(stream())
    .pipe(dest);
}

gulp.task('serve', gulp.series(clean, traverse, live));
