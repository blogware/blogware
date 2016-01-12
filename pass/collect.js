var table = require('../table');

function pass(file) {
  if (file.meta('type') !== 'document') {
    return file;
  }

  var collection = file.meta('collection');

  if (!collection) {
    return file;
  }

  table.collection.add(collection, file);

  return file;
}

module.exports = pass;
