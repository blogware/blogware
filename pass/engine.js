var plugin = require('../plugin');

function pass(file) {
  var engine = plugin.lookup(file.extname);

  if (engine) {
    file.meta('engine', engine);
  }

  return file;
}

module.exports = pass;
