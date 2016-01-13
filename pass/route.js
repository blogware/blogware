var path = require('path');
var moment = require('moment');
var table = require('../table');

function pass(file) {
  if (!file) return null;

  var location = locate(file);

  table.route.add(file.relative, location);

  return file;
}

function locate(file) {
  var relative = file.relative;
  var collection = file.meta('collection');

  if (collection) {
    relative = relative.replace('_' + collection + '/', '');
  }

  if (collection === 'posts') {
    relative = relative.replace(/^\d{4}-\d{2}-\d{2}-/, '');

    var date = new Date(file.meta('matter').date)

    if (date) {
      try {
        date = new Date(date).toISOString();
        relative = moment(date).format('YYYY/MM/DD/') + relative;
      } catch(err) {}
    }
  }

  if (relative.indexOf('_') === 0) {
    return;
  }

  var location = relative;

  var engine = file.meta('engine');

  if (engine) {
    location = engine.rename(relative);
  }

  location = permalink(location);

  return location;
}

function permalink(location) {
  var extname = path.extname(location);
  var basename = path.basename(location, extname);
  var dirname = path.dirname(location);

  if (extname !== '.html') {
    return location;
  }

  if (basename === 'index') {
    return location;
  }

  location = path.join(dirname, basename, 'index.html');

  return location;
}

module.exports = pass;
