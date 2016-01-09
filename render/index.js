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

function render(location, cb) {
  var relative = route.l2r(location);
  var file = record.r2f(relative);

  if (!file) {
    var err = new Error('Not Found');
    err.status = 404;
    return cb(err);
  }

  var renderer = renderers[file.meta('type')];

  if (renderer) {
    renderer(file, function(err, rendered) {
      if (err) return cb(err);
      cb(null, rendered);
    });
  } else {
    cb(new Error('Unknown type: ' + relative));
  }
}

module.exports = render;
