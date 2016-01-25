var _ = require('lodash');

var store1 = {}; // relative -> locations
var store2 = {}; // location -> relative

function add(relative, locations) {
  if (!_.isArray(locations)) return;

  locations = _.uniq(_.compact(locations));

  if (locations.length === 0) return;

  var before = store1[relative];

  store1[relative] = locations;

  _.difference(locations, before).forEach(function(location) {
    store2[location] = relative;
  });

  _.difference(before, locations).forEach(function(location) {
    delete store2[location];
  });
}

function del(relative) {
  var locations = store1[relative] || [];

  locations.forEach(function(location) {
    delete store2[location];
  });

  delete store1[relative];
}

function r2l(relative) {
  return store1[relative];
}

function l2r(location) {
  return store2[location];
}

exports.add = add;
exports.del = del;
exports.r2l = r2l;
exports.l2r = l2r;
