var table = require('../table');
var asset = require('./asset');
var document = require('./document');
var other = require('./other');

var renderers = {
  asset: asset,
  document: document,
  other: other
}

function render(location) {
  location = fixLocation(location);

  var file = table.l2f(location);

  if (!file) {
    var err = new Error('File not found: ' + location);
    err.status = 404;
    return Promise.reject(err);
  }

  var renderer = renderers[file.meta('type')];

  if (renderer) {
    return renderer(location, file);
  } else {
    var err = new Error('Unknown type: ' + relative);
    return Promise.reject(err);
  }
}

function fixLocation(location) {
  var location2 = location;

  if (table.l2f(location2)) {
    return location2;
  }

  if (location2.slice(-1) === '/') {
    location2 += 'index.html';
  } else {
    location2 += '/index.html';
  }

  return location2;
}


module.exports = render;
