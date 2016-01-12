var store = {};

store.blogware = {};
store.site = {};

function add(group, name, value) {
  store[group] = store[group] || {};
  store[group][name] = value;
}

function get() {
  return store;
}

exports.add = add;
exports.get = get;
