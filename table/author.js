var _ = require('lodash');
var config = require('./config');

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

function all() {
  var authors = {};
  var site = config.all().site;

  Object.keys(store2).forEach(function(key) {
    var title = key;
    var slug = _.kebabCase(key);
    var posts = store2[key];

    var author = {
      title: title,
      slug: slug,
      posts: posts
    };

    if (site.authors) {
      author = _.merge(author, site.authors[key]);
    }

    author.path = '/author/' + author.slug + '/';

    authors[key] = author;
  });

  return authors;
}

exports.add = add;
exports.del = del;
exports.all = all;
