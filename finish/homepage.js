var table = require('../table');

function finish(opts) {
  var file = table.l2f('index.html');

  if (!file) {
    return opts;
  }

  var modified = opts.marked.posts || [];

  if (modified.length === 0) {
    return opts;
  }

  var perpage = file.meta('matter').perpage || table.config.all().site.perpage;

  if (!perpage) {
    return opts;
  }

  var total = (table.collection.all().posts || []).length;
  var pages = Math.ceil(total / perpage) || 1;

  var locations = [];
  var first = table.route.r2l(file.relative)[0];

  locations.push(first);

  var location = first;

  location = location.charAt(0) === '/' ? location : '/' + location;

  var index = location.lastIndexOf('/');

  for (var i = 2; i <= pages; i++) {
    var l = location.slice(0, index) + '/page/' + i + location.slice(index)
    if (location.indexOf('/') === 0) l = l.slice(1);
    locations.push(l);
  }

  table.route.add(file.relative, locations);

  return opts;
}

module.exports = finish;
