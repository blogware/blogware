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
    .pipe(stream());
}

function preview() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
}

gulp.task('serve', gulp.series(clean, traverse, preview));
