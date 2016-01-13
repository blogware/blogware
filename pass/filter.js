var gutil = require('gulp-util');

function pass(file) {
  if (!file) return null;

  if (isDirectory(file)) {
    return null;
  }

  gutil.log('Changed', '\'' + gutil.colors.yellow(file.relative) + '\'');

  return file;
}

function isDirectory(file) {
  return file.stat && file.stat.isDirectory();
}

module.exports = pass;
