var gutil = require('gulp-util');
var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('event') === 'unlink') {
    gutil.log('Deleted', '\'' + gutil.colors.yellow(file.relative) + '\'');
    return file;
  }

  if (isDirectory(file)) {
    return null;
  }

  if (isUnchanged(file)) {
    gutil.log('Unchanged', '\'' + gutil.colors.yellow(file.relative) + '\'');
    return null;
  }

  gutil.log('Changed', '\'' + gutil.colors.yellow(file.relative) + '\'');
  return file;
}

function isDirectory(file) {
  return file.stat && file.stat.isDirectory();
}

function isUnchanged(file) {
  var cached = table.record.r2f(file.relative);

  if (!cached) return false;

  c1 = file.contents.toString('utf8');
  c2 = (cached.meta('originalContents') || cached.contents).toString('utf8');

  return c1 === c2;
}

module.exports = pass;
