var store = {};

function add(collection, data) {
  store[collection] = store[collection] || [];
  store[collection].push(data);
  store[collection].sort(function(a, b) {
    return new Date(b.date) - new Date(a.date);
  });
}

function get(collection) {
  return store[collection];
}

exports.add = add;
exports.get = get;
