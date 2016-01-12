var store1 = {}; // relative -> location
var store2 = {}; // location -> relative

function add(relative, location) {
  store1[relative] = location;
  store2[location] = relative;
}

function r2l(relative) {
  return store1[relative];
}

function l2r(location) {
  return store2[location];
}

exports.add = add;
exports.r2l = r2l;
exports.l2r = l2r;
