var _ = require('lodash');
var path = require('path');
var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('event') === 'unlink') {
    return file;
  }

  if (file.meta('type') !== 'document') {
    return file;
  }

  if (!table.route.r2l(file.relative)) {
    return file;
  }

  var title = getTitle(file);

  file.meta('matter').title = title;

  return file;
}

function getTitle(file) {
  var title = file.meta('matter').title;

  if (title) {
    return title;
  }

  var location = table.route.r2l(file.relative)[0];
  var basename = path.basename(location);

  if (basename === 'index.html') {
    location = path.dirname(location);
    basename = path.basename(location);
  }

  var name = path.basename(basename, path.extname(basename));

  return _.startCase(name);
}

module.exports = pass;
