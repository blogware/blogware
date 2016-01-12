var path = require('path');

function render(location, file) {
  var clone = file.clone();
  clone.path = path.resolve(clone.base, location);
  file.contents = null;
  return Promise.resolve(clone);
}

module.exports = render;
