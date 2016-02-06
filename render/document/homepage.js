var _ = require('lodash');
var path = require('path');
var renderFile = require('./util').renderFile;
var preparePaginator = require('./util').preparePaginator;
var l2p = require('./util').l2p;

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
  // @paginator & @paged
  opts.data.paginator = preparePaginator(location, file, opts);

  if (opts.data.paginator.page > 1) {
    opts.data.paged = true;
  }

  return opts;
}

module.exports = render;
