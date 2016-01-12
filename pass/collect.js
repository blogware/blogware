var table = require('../table');

var collections = [
  'posts',
  'pages'
]

function pass(file) {
  if (file.meta('type') !== 'document') {
    return file;
  }

  var collection = getCollection(file);

  if (!collection) {
    return file;
  }

  file.meta('collection', collection);
  table.collection.add(collection, file);

  return file;
}

function getCollection(file) {
  var relative = file.relative;

  var collection;

  for (var i = 0; i < collections.length; i++) {
    var name = collections[i];

    if (relative.indexOf('_' + name + '/') === 0) {
      collection = name;
      break;
    }
  }

  return collection;
}

module.exports = pass;
