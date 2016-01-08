var table = require('../table');
var route = table.route

function pass(file) {
  var relative = file.relative;
  var location = relative;

  route.add(relative, location);

  return file;
}

module.exports = pass;
