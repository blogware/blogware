var bootstrap = require('./bootstrap');

bootstrap();

var resolve = require('path').resolve;
var join = require('path').join;
var gulp = require('gulp');
var gutil = require('gulp-util');
var through = require('through2');
var del = require('del');
var browserSync = require('browser-sync').create();
var htmlInjector = require('bs-html-injector');
var modRewrite = require('connect-modrewrite');
var ghPages = require('gulp-gh-pages');
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

function dynamics() {
  serve(app);
  watch();
}

function statics() {
  serve(function(req, res, next) {
    next();
  });
}

function serve(middleware) {
  var config = table.config.all();
  var basepath = config.site.basepath || '';

  browserSync.use(htmlInjector);
  browserSync.init({
    notify: false,
    ui: false,
    server: '_site',
    startPath: basepath + '/',
    middleware: [
      modRewrite([
        '^' + basepath + '/(.*) /$1'
      ]),
      middleware
    ]
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

  // 'add' or 'change'
  src = src || gulp.src(path);

  var dest;

  dest = gulp.dest('_site');
  dest.on('finish', htmlInjector);

  src
    .pipe(stream())
    .pipe(remove())
    .pipe(dest);
}

function remove() {
  return through.obj(function(file, _, cb) {
    if (file.meta('event') !== 'unlink') {
      return cb(null, file);
    }

    var path = join(file.cwd, '_site', file.relative);

    del(path)
      .then(function() {
        cb(null, null);
      })
      .catch(cb);
  });
}

function setenv(cb) {
  process.env.NODE_ENV = 'staging';
  cb();
}

function gitpush() {
  return gulp.src('_site/**/*')
    .pipe(ghPages({
      branch: 'master'
    }));
}

gulp.task('serve', gulp.series(clean, traverse, dynamics));
gulp.task('preview', gulp.series(setenv, clean, traverse, statics));
gulp.task('publish', gulp.series(setenv, clean, traverse, gitpush));
