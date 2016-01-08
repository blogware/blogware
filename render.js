var table = require('./table');
var record = table.record;
var route = table.route;

function render(location, cb) {
  var relative = route.l2r(location);
  var file = record.r2f(relative);

  if (!file) {
    return cb(new Error('File not found'));
  }

  var contents = file.contents.toString('utf8');

  cb(null, contents);
}

module.exports = render;
