var gulp = require('gulp');
var app = require('./app');
var stream = require('./stream');

function traverse() {
  return gulp.src(['**/*', '!_site{,/**/*}'])
    .pipe(stream());
}

function preview() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
}

gulp.task('serve', gulp.series(traverse, preview));
