var table = require('../table');

function pass(file) {
  if (!file) return null;

  var relative = file.relative;

  if (file.meta('event') !== 'unlink') {
    table.record.add(relative, file);
  } else {
    table.record.del(relative);
  }

  return file;
}

module.exports = pass;
