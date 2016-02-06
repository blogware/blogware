var _ = require('lodash');
var path = require('path');
var table = require('../../table');
var renderFile = require('./util').renderFile;
var preparePaginator = require('./util').preparePaginator;
var l2p = require('./util').l2p;

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
  var authors = table.author.all();
  var tags = table.tag.all();

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
  opts.data.paginator = preparePaginator(location, file, opts);

  if (opts.data.paginator.page > 1) {
    opts.data.paged = true;
  }

  return opts;
}

module.exports = render;
