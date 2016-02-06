var _ = require('lodash');
var path = require('path');
var table = require('../../table');
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
  var authors = opts.data.authors;

  // @author
  var slug = getSlug('author', location);
  var author = _.find(authors, { slug: slug });

  opts.data.author = author;

  // @posts by @author
  var posts = _.filter(opts.data.posts, function(post) {
    return post.author && post.author.slug === author.slug;
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
