var record = require('./record');
var route = require('./route');
var collection = require('./collection');

function l2f(location) {
  var relative = route.l2r(location);
  var file = record.r2f(relative);

  return file;
}

exports.record = record;
exports.route = route;
exports.collection = collection;
exports.l2f = l2f;
