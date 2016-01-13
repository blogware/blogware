var store1 = {}; // relative -> location
var store2 = {}; // location -> relative

function add(relative, location) {
  var before = store1[relative];

  store1[relative] = location;

  if (location !== before) {
    delete store2[before];
    store2[location] = relative;
  }
}

function del(relative) {
  var location = store1[relative];

  delete store2[location];
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
