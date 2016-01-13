var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  var path = getPath(file);

  file.meta('matter').path = path;

  return file;
}

function getPath(file) {
  var path;

  var location = table.route.r2l(file.relative);

  path = '/' + location;
  path = path.replace(/index.html$/, '');

  return path;
}

module.exports = pass;
