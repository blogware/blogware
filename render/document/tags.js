var _ = require('lodash');
var path = require('path');
var renderFile = require('./util').renderFile;
var preparePaginator = require('./util').preparePaginator;
var getSlug = require('./util').getSlug;

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
  var tags = opts.data.tags;

  // @tag
  var slug = getSlug('tag', location);
  var tag = _.find(tags, { slug: slug });

  opts.data.tag = tag;

  // @posts with @tag
  var posts = _.filter(opts.data.posts, function(post) {
    return _.include(_.map(post.tags, function(tag) {
      return tag.slug;
    }), tag.slug)
  });

  opts.data.posts = posts;

  // @paginator & @paged
  opts.data.paginator = preparePaginator(location, file, opts);

  if (opts.data.paginator.page > 1) {
    opts.data.paged = true;
  }

  return opts;
}

module.exports = render;
