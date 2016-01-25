var table = require('../table');

function finish(opts) {
  var files = opts.marked.paginate || [];

  files.forEach(function(file) {
    update(file);
  });

  return opts;
}

function update(file) {
  var perpage = Math.floor(file.meta('matter').perpage);

  if (!perpage) return;

  var collection = table.collection.all();
  var length = (collection.posts || []).length;
  var total = Math.ceil(length / perpage);

  var locations = [];

  var location = table.route.r2l(file.relative)[0];

  locations.push(location);
  location = location.indexOf('/') === 0 ? location : '/' + location;

  var index = location.lastIndexOf('/');

  for (var i = 2; i <= total; i++) {
    var l = location.slice(0, index) + '/page/' + i + location.slice(index)
    if (location.indexOf('/') === 0) {
      l = l.slice(1);
    }
    locations.push(l);
  }

  table.route.add(file.relative, locations);
}

module.exports = finish;
