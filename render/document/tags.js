var _ = require('lodash');
var path = require('path');
var table = require('../../table');
var renderFile = require('./util').renderFile;
var preparePaginator = require('./util').preparePaginator;
var l2p = require('./util').l2p;

function render(location, file) {
  return new Promise(function(resolve, reject) {
    var opts = prepareOptions(location, file);

    renderFile(file, opts, function(err, rendered) {
      if (err) return reject(err);

      var clone = file.clone();
      clone.path = path.resolve(clone.base, location);
      clone.contents = new Buffer(rendered);

      resolve(clone);
    });
  });
}

function prepareOptions(location, file) {
  var opts = {};
  var config = table.config.all();
  var collection = table.collection.all();

  opts.data = {};

  // @blogware, @site, @posts, @pages and @current
  _.merge(opts.data, config);
  _.merge(opts.data, collection);
  opts.data.current = file.meta('matter');

  // @authors
  var authors = table.author.all();
  opts.data.authors = Object.keys(authors);

  // @tags
  var tags = table.tag.all();
  opts.data.tags = Object.keys(tags);

  // @navigation
  var navigation = _.map(opts.data.site.navigation || [], function(value, key) {
    return {
      title: key,
      path: value
    };
  });

  navigation.forEach(function(item) {
    var path1 = l2p(location).replace(/\/+$/, '');
    var path2 = item.path.replace(/index.html$/, '').replace(/\/+$/, '');

    if (path1 === path2) {
      item.current = true;
    }
  });

  opts.data.navigation = navigation.length ? navigation : null;

  // @tag
  var slug = getSlug(location);
  var tag = _.find(tags, { slug: slug });

  opts.data.tag = tag;

  // @posts with @tag
  var posts = (tag.posts || []).map(function(relative) {
    return table.collection.get('posts', relative);
  }).sort(function(a, b) {
    return b.date > a.date;
  });

  posts = posts.map(function(post) {
    var _post = _.cloneDeep(post);

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
  });

  opts.data.posts = posts.length ? posts : null;

  // @paginator & @paged
  opts.data.paginator = preparePaginator(location, file, opts);

  if (opts.data.paginator.page > 1) {
    opts.data.paged = true;
  }

  return opts;
}

function getSlug(location) {
  var slug;
  var pattern = /^tag\/([^\/]+)\//;
  var matches = location.match(pattern);

  if (matches) {
    slug = matches[1];
  }

  return slug;
}

module.exports = render;
