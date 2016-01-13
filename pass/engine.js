var plugin = require('../plugin');

function pass(file) {
  if (!file) return null;

  var engine = plugin.lookup(file.extname);

  if (engine) {
    file.meta('engine', engine);
  }

  return file;
}

module.exports = pass;
