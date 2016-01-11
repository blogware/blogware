var gutil = require('gulp-util');

function pass(file) {
  gutil.log('Changed', '\'' + gutil.colors.yellow(file.relative) + '\'');

  return file;
}

module.exports = pass;
