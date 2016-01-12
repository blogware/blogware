var record = require('./record');
var route = require('./route');
var collection = require('./collection');
var config = require('./config');

function l2f(location) {
  var relative = route.l2r(location);
  var file = record.r2f(relative);

  return file;
}

exports.record = record;
exports.route = route;
exports.collection = collection;
exports.config = config;

exports.l2f = l2f;
