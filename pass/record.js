var record = require('../record');

function pass(file) {
  var relative = file.relative;

  record.add(relative, file);

  return file;
}

module.exports = pass;
