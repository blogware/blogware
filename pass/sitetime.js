var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  var collection = file.meta('collection');

  if (collection !== 'posts') {
    return file;
  }

  if (file.meta('event') !== 'unlink') {
    var time = file.meta('matter').date;

    if (time) {
      table.config.add('site', 'time', time);
    }
  }

  return file;
}

module.exports = pass;
