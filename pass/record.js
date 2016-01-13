var table = require('../table');
var record = table.record;

function pass(file) {
  if (!file) return null;

  var relative = file.relative;

  record.add(relative, file);

  return file;
}

module.exports = pass;
