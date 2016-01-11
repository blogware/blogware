var table = require('../table');
var route = table.route

function pass(file) {
  var relative = file.relative;
  var location = locate(file);

  route.add(relative, location);

  return file;
}

function locate(file) {
  var relative = file.relative;

  if (relative.indexOf('_') === 0) {
    return;
  }

  var location = relative;

  var engine = file.meta('engine');

  if (engine) {
    location = engine.route(file);
  }

  return location;
}

module.exports = pass;
