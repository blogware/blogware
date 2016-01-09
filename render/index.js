var table = require('../table');
var record = table.record;
var route = table.route;

var asset = require('./asset');
var template = require('./template');
var other = require('./other');

var renderers = {
  asset: asset,
  template: template,
  other: other
}

function render(location) {
  var relative = route.l2r(location);
  var file = record.r2f(relative);

  if (!file) {
    var err = new Error('Not Found');
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
