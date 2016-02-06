var _ = require('lodash');
var path = require('path');
var renderFile = require('./util').renderFile;

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

  // @posts
  var posts = (opts.data.posts || []).sort(function(a, b) {
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

  return opts;
}

module.exports = render;
