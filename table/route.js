var store1 = {}; // relative -> location
var store2 = {}; // location -> relative

function add(relative, location) {
  store1[relative] = location;
  store2[location] = relative;
}

function l2r(location) {
  return store2[location];
}

exports.add = add;
exports.l2r = l2r;
