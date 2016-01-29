var table = require('../table');

var relative = 'index.hbs';

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

  // Paginate homepage

  var total = (table.collection.all().posts || []).length;
  var pages = Math.ceil(total / perpage) || 1;

  var locations = [];

  locations.push('index.html');

  for (var i = 2; i <= pages; i++) {
    locations.push('page/' + i + '/index.html');
  }

  table.route.add(relative, locations);

  return opts;
}

module.exports = finalize;
