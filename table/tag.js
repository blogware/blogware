var _ = require('lodash');
var collection = require('./collection');

var store1 = {};
var store2 = {};

function add(relative, tags) {
  tags = _.uniq(_.compact(tags));

  var before = store1[relative];

  store1[relative] = tags;

  if (store1[relative].length === 0) {
    delete store1[relative];
  }

  _.difference(tags, before).forEach(function(key) {
    addVal(store2, key, relative);
  });

  _.difference(before, tags).forEach(function(key) {
    delVal(store2, key, relative);
  });
}

function del(relative) {
  var before = store1[relative] || [];

  delete store1[relative];

  before.forEach(function(key) {
    delVal(store2, key, relative);
  });
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

function all() {
  var tags = {};

  Object.keys(store2).forEach(function(key) {
    var title = key;
    var slug = _.kebabCase(key);
    var path = '/tag/' + slug + '/';
    var posts = store2[key];

    tags[key] = {
      title: title,
      slug: slug,
      path: path,
      posts: posts
    };
  });

  return tags;
}

exports.add = add;
exports.del = del;
exports.all = all;
