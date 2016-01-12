var store = {};

function add(collection, file) {
  store[collection] = store[collection] || [];
  store[collection].push(file);
}

function get(collection) {
  return store[collection];
}

exports.add = add;
exports.get = get;
