var path = require('path');
var table = require('../table');

function render(location) {
  var file = table.l2f(location);
  var clone = file.clone();
  clone.path = path.resolve(clone.base, location);
  file.contents = null;
  return Promise.resolve(clone);
}

module.exports = render;
