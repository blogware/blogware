var _ = require('lodash');
var table = require('../table');

var relative = '_layouts/tag.hbs';

function finalize(opts) {
  var file = table.record.r2f(relative);

  if (!file) {
    return opts;
  }

  var modified = (opts.marked.modified || []).map(function(file) {
    return file.relative;
  });

  var posts = opts.marked.posts || [];

  if (posts.length === 0 && !_.include(modified, relative)) {
    return opts;
  }

  var perpage = Number(file.meta('matter').perpage);
  var tags = table.tag.all();
  var locations = [];

  _.forEach(tags, function(tag) {
    var total = (tag.posts || []).length;

    perpage = perpage || total;

    if (perpage) {
      var pages = Math.ceil(total / perpage) || 1;

      locations.push('tag/' + tag.slug + '/index.html');

      for (var i = 2; i <= pages; i++) {
        locations.push('tag/' + tag.slug + '/page/' + i + '/index.html');
      }
    }
  });

  table.route.add(relative, locations);

  return opts;
}

module.exports = finalize;
