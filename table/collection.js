var _ = require('lodash');

var store = {};

function add(collection, data) {
  store[collection] = store[collection] || [];
  store[collection].push(data);
  store[collection].sort(function(a, b) {
    return b.date > a.date;
  });
}

function del(collection, data) {
  if (!store[collection]) return;

  store[collection] = _.filter(store[collection], function(entry) {
    return entry.relative !== data.relative;
  });
}

function get(collection) {
  return store[collection];
}

exports.add = add;
exports.del = del;
exports.get = get;
