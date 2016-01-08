var gulp = require('gulp');
var app = require('./app');

function serve() {
  app.listen(3000, function() {
    console.log('Listening on port 3000');
  });
}

gulp.task('serve', serve);
