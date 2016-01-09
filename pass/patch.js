var patch = require('../patch');

function pass(file) {
  patch.attach(file);

  return file;
}

module.exports = pass;
