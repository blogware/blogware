var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  if (file.meta('collection') !== 'posts') {
    return file;
  }

  if (file.meta('event') !== 'unlink') {
    add(file);
  } else {
    del(file);
  }

  return file;
}

function add(file) {
  var author = file.meta('matter').author;
  var relative = file.relative;

  table.author.add(relative, author);
}

function del(file) {
  var relative = file.relative;

  table.author.del(relative);
}

module.exports = pass;
