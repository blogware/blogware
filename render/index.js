var table = require('../table');
var asset = require('./asset');
var template = require('./template');
var other = require('./other');

var renderers = {
  asset: asset,
  template: template,
  other: other
}

function render(location) {
  var file = table.l2f(location);

  if (!file) {
    var err = new Error('File not found: ' + location);
    err.status = 404;
    return Promise.reject(err);
  }

  var renderer = renderers[file.meta('type')];

  if (renderer) {
    return renderer(location);
  } else {
    var err = new Error('Unknown type: ' + relative);
    return Promise.reject(err);
  }
}

module.exports = render;
