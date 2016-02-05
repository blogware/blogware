var homepage = require('./homepage');
var authors = require('./authors');
var tags = require('./tags');
var other = require('./other');

function render(location, file) {
  var relative = file.relative;

  if (relative === 'index.hbs') {
    return homepage(location, file);
  }

  if (relative === '_layouts/author.hbs') {
    return authors(location, file);
  }

  if (relative === '_layouts/tag.hbs') {
    return tags(location, file);
  }

  return other(location, file);
}

module.exports = render;
