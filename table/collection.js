var store1 = {};
var store2 = {};

function add(collection, relative, data) {
  store1[collection] = store1[collection] || {};
  store1[collection][relative] = data;
  update(collection);
}

function del(collection, relative) {
  if (store1[collection]) {
    delete store1[collection][relative];
  }

  var _collection = store1[collection];

  if (!_collection || !Object.keys(_collection).length) {
    delete store1[collection];
  }

  update(collection);
}

function update(collection) {
  if (!store1[collection]) {
    delete store2[collection];
    return;
  }

  store2[collection] = [];

  Object.keys(store1[collection]).forEach(function(key1) {
    store2[collection].push(store1[collection][key1]);
  });

  store2[collection].sort(function(a, b) {
    return b.date > a.date;
  });
}

function get(collection, relative) {
  return store1[collection][relative];
}

function all() {
  return store2;
}

exports.add = add;
exports.del = del;
exports.get = get;
exports.all = all;
