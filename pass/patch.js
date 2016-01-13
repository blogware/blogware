var patch = require('../patch');

function pass(file) {
  if (!file) return null;

  patch.attach(file);

  return file;
}

module.exports = pass;
