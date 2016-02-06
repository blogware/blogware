var _ = require('lodash');
var path = require('path');
var table = require('../../table');
var renderFile = require('./render-file');

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

  // @posts
  var posts = (opts.data.posts || []).sort(function(a, b) {
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
  opts.data.paginator = preparePaginator(opts, location, file);

  if (opts.data.paginator.page > 1) {
    opts.data.paged = true;
  }

  return opts;
}

function preparePaginator(opts, location, file) {
  var perpage = Math.floor(opts.data.current.perpage);
  var total = (opts.data.posts || []).length;

  if (!perpage) {
    return {
      perpage: perpage,
      total: total,
      begin: 0,
      end: total - 1,
      page: 1,
      pages: 1,
      prev: null,
      next: null
    };
  }

  var pages = Math.ceil(total / perpage) || 1;

  var page;
  var pattern = /\bpage\/(\d+)\b/;
  var matches = location.match(pattern);

  if (matches) {
    page = Number(matches[1]);
  }

  page = page || 1;

  var begin = perpage * (page - 1);
  var end = Math.min(perpage * page - 1, total - 1);

  // var prevNumber = page > 1 ? page - 1 : null;
  // var nextNumber = perpage * page < total ? page + 1 : null;

  var relative = file.relative;
  var locations = table.route.r2l(relative);
  var index = locations.indexOf(location);

  var prev = l2p(locations[index - 1]);
  var next = l2p(locations[index + 1]);

  var paginator = {
    perpage: perpage,
    total: total,
    begin: begin,
    end: end,
    page: page,
    pages: pages,
    prev: prev,
    next: next
  }

  return paginator;
}

function l2p(location) {
  if (!location) return null;

  var path2 = location;

  path2 = '/' + path2;
  path2 = path2.replace(/index.html$/, '');

  return path2;
}

module.exports = render;
