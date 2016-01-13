var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  var collection = file.meta('collection');

  if (!collection) {
    return file;
  }

  if (file.meta('event') !== 'unlink') {
    table.collection.add(collection, file.meta('matter'));
  } else {
    table.collection.del(collection, file.meta('matter'));
  }

  return file;
}

module.exports = pass;
