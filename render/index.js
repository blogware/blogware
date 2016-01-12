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
  var file = getFile(location);

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

function getFile(location) {
  var file;

  file = table.l2f(location);

  if (!file) {
    if (location.slice(-1) === '/') {
      location = location + 'index.html';
    } else {
      location = location + '/index.html';
    }

    file = table.l2f(location);
  }

  return file;
}

module.exports = render;
