var gulp = require('gulp');
var app = require('./app');

function traverse() {
  return gulp.src(['**/*', '!_site{,/**/*}'])
    .pipe(gulp.dest('_site'));
}

function preview() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
}

gulp.task('serve', gulp.series(traverse, preview));
