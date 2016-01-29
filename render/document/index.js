var homepage = require('./homepage');
var tags = require('./tags');
var other = require('./other');

function render(location, file) {
  var relative = file.relative;

  if (relative === 'index.hbs') {
    return homepage(location, file);
  }

  if (relative === '_templates/tag.hbs') {
    return tags(location, file);
  }

  return other(location, file);
}

module.exports = render;
