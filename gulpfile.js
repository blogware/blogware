var plugin = require('./plugin');

plugin.register();

var gulp = require('gulp');
var del = require('del');
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
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
}

function watch() {
  gulp.watch(['**/*', '!_site{,/**/*}'], {})
    .on('all', function(event, path) {
      gulp.src(path)
        .pipe(stream())
        .pipe(gulp.dest('_site'));
    });
}

gulp.task('serve', gulp.series(clean, traverse, live));
