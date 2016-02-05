var _ = require('lodash');
var table = require('../table');

var relative = '_layouts/author.hbs';

function finalize(opts) {
  var file = table.record.r2f(relative);

  if (!file) {
    return opts;
  }

  var modified = (opts.marked.modified || []).map(function(file) {
    return file.relative;
  });

  var posts = opts.marked.posts || [];

  if (posts.length === 0 && !_.include(modified, relative) && !_.include(modified, '_config.yml')) {
    return opts;
  }

  var perpage = Number(file.meta('matter').perpage);
  var authors = table.author.all();
  var locations = [];

  _.forEach(authors, function(author) {
    var total = (author.posts || []).length;

    perpage = perpage || total;

    if (perpage) {
      var pages = Math.ceil(total / perpage) || 1;

      locations.push('author/' + author.slug + '/index.html');

      for (var i = 2; i <= pages; i++) {
        locations.push('author/' + author.slug + '/page/' + i + '/index.html');
      }
    }
  });

  table.route.add(relative, locations);

  return opts;
}

module.exports = finalize;
