var _ = require('lodash');

var store1 = {}; // relative -> author
var store2 = {}; // author -> relatives

function add(relative, author) {
  var before = store1[relative];

  if (before === author) return;

  store1[relative] = author;

  delVal(store2, before, relative);
  addVal(store2, author, relative);
}

function del(relative) {
  var before = store1[relative];

  delete store1[relative];

  delVal(store2, before, relative);
}

function addVal(store, key, value) {
  store[key] = _.union(store[key], [value]);
}

function delVal(store, key, value) {
  if (!store[key]) return;

  _.remove(store[key], function(v) {
    return v === value;
  });

  if (store[key].length === 0) {
    delete store[key];
  }
}

exports.add = add;
exports.del = del;
