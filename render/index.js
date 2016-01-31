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
  var _location = location;
  var file = table.l2f(location);

  if (!file) {
    location += '/index.html';
    location = location.replace('//', '/');
  }

  file = table.l2f(location);

  if (!file) {
    _location = _location.replace(/\/$/, '/index.html');
    var err = new Error('File not found: ' + _location);
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

module.exports = render;
