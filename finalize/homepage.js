var table = require('../table');

var relative = 'index.hbs';

function finalize(opts) {
  var file = table.record.r2f(relative);

  if (!file) {
    return opts;
  }

  var posts = opts.marked.posts || [];

  if (posts.length === 0) {
    return opts;
  }

  // Paginate homepage

  var perpage = Number(file.meta('matter').perpage);
  var total = (table.collection.all().posts || []).length;
  var locations = [];

  perpage = perpage || total;

  locations.push('index.html');

  if (perpage) {
    var pages = Math.ceil(total / perpage) || 1;

    for (var i = 2; i <= pages; i++) {
      locations.push('page/' + i + '/index.html');
    }
  }

  table.route.add(relative, locations);

  return opts;
}

module.exports = finalize;
