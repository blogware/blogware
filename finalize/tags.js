var table = require('../table');

var relative = '_templates/tag.hbs';

function finalize(opts) {
  var file = table.record.r2f(relative);

  if (!file) {
    return opts;
  }

  var modified = opts.marked.posts || [];

  if (modified.length === 0) {
    return opts;
  }

  var perpage = file.meta('matter').perpage;

  if (!perpage) {
    return opts;
  }

  // Paginate tag pages

  var tags = table.tag.all();
  var locations = [];

  Object.keys(tags).forEach(function(tag) {
    var total = (tags[tag] || []).length;
    var pages = Math.ceil(total / perpage) || 1;

    locations.push('tag/' + tag + '/index.html');

    for (var i = 2; i <= pages; i++) {
      locations.push('tag/' + tag + '/page/' + i + '/index.html');
    }
  });

  table.route.add(relative, locations);

  return opts;
}

module.exports = finalize;
