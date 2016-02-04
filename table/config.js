var store = {};

store.blogware = {};
store.site = {};

function add(group, name, value) {
  store[group] = store[group] || {};
  store[group][name] = value;
}

function del(group) {
  store[group] = {};
}

function all() {
  return store;
}

exports.add = add;
exports.del = del;
exports.all = all;
