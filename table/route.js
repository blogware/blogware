var _ = require('lodash');

var store1 = {}; // relative -> locations
var store2 = {}; // location -> relative

function add(relative, location) {
  if (location == null) return;
  store1[relative] = _.union(store1[relative], [location]);
  store2[location] = relative;
}

function del(relative) {
  var before = store1[relative] || [];

  delete store1[relative];

  before.forEach(function(key) {
    delete store2[key];
  });
}

function r2l(relative) {
  return store1[relative] && store1[relative][0];
}

function l2r(location) {
  return store2[location];
}

exports.add = add;
exports.del = del;
exports.r2l = r2l;
exports.l2r = l2r;
