var store = {};

function add(relative, file) {
  store[relative] = file;
}

function del(relative) {
  delete store[relative];
}

function r2f(relative) {
  return store[relative];
}

function all() {
  return Object.keys(store);
}

exports.add = add;
exports.del = del;
exports.r2f = r2f;
exports.all = all;
