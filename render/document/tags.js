var _ = require('lodash');
var path = require('path');
var table = require('../../table');
var renderFile = require('./util').renderFile;
var preparePaginator = require('./util').preparePaginator;

function render(location, file, opts) {
  updateOptions(location, file, opts);

  return new Promise(function(resolve, reject) {
    renderFile(file, opts, function(err, rendered) {
      if (err) return reject(err);

      var clone = file.clone();
      clone.path = path.resolve(clone.base, location);
      clone.contents = new Buffer(rendered);

      resolve(clone);
    });
  });
}

function updateOptions(location, file, opts) {
  var authors = opts.data.authors;
  var tags = opts.data.tags;

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
