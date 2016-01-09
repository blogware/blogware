var table = require('../table');
var route = table.route

function pass(file) {
  var relative = file.relative;
  var location = relative;

  var engine = file.meta('engine');

  if (engine) {
    location = engine.route(relative);
  }

  route.add(relative, location);

  return file;
}

module.exports = pass;
