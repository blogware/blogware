var _ = require('lodash');
var table = require('../../../table');
var l2p = require('./l2p');

function prepareOptions(location, file) {
  var opts = {};
  var config = table.config.all();
  var collection = table.collection.all();

  opts.data = {};

  // @blogware, @site, @posts & @pages
  _.merge(opts.data, config);
  _.merge(opts.data, collection);

  // @authors
  var authors = table.author.all();
  opts.data.authors = authors;

  // @tags
  var tags = table.tag.all();
  opts.data.tags = tags;

  // tags = _.map(tags || [], function(tag) {
  //   var _tag = _.clone(tag);

  //   if (_tag.posts) {
  //     _tag.posts = _tag.posts.map(function(relative) {
  //       return table.collection.get('posts', relative);
  //     }).sort(function(a, b) {
  //       return b.date > a.date;
  //     });
  //   }

  //   return _tag;
  // });

  // opts.data.tags = tags.length ? tags : null;

  // @posts
  var posts = (opts.data.posts || []).sort(function(a, b) {
    return b.date > a.date;
  });

  posts = posts.map(expand);

  opts.data.posts = posts.length ? posts : null;

  // @current
  var current = file.meta('matter');

  current = expand(current);

  opts.data.current = current;

  // @navigation
  var navigation = _.map(opts.data.site.navigation || [], function(value, key) {
    return {
      title: key,
      path: value
    };
  });

  navigation.forEach(function(entry) {
    var path1 = l2p(location).replace(/\/+$/, '');
    var path2 = entry.path.replace(/index.html$/, '').replace(/\/+$/, '');

    if (path1 === path2) {
      entry.current = true;
    }
  });

  opts.data.navigation = navigation.length ? navigation : null;

  return opts;

  function expand(post) {
    var _post = _.clone(post);

    if (_post.author) {
      _post.author = authors[_post.author];
    }

    if (_post.tags) {
      _post.tags = _.isArray(_post.tags) ? _post.tags : [_post.tags]
      _post.tags = _post.tags.map(function(tag) {
        return tags[tag];
      });
    }

    return _post;
  }
}

module.exports = prepareOptions;
