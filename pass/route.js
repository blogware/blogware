var route = require('../route');

function pass(file) {
  var relative = file.relative;
  var location = relative;

  route.add(relative, location);

  return file;
}

module.exports = pass;
