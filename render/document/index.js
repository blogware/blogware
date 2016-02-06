var prepareOptions = require('./util').prepareOptions;
var homepage = require('./homepage');
var authors = require('./authors');
var tags = require('./tags');
var other = require('./other');

function render(location, file) {
  var opts = prepareOptions(location, file);

  var relative = file.relative;

  if (relative === 'index.hbs') {
    return homepage(location, file, opts);
  }

  if (relative === '_layouts/author.hbs') {
    return authors(location, file, opts);
  }

  if (relative === '_layouts/tag.hbs') {
    return tags(location, file, opts);
  }

  return other(location, file, opts);
}

module.exports = render;
