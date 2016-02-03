var _ = require('lodash');
var path = require('path');
var table = require('../../table');
var renderFile = require('./render-file');

function render(location, file) {
  return new Promise(function(resolve, reject) {
    var opts = prepareOptions(location, file);

    renderFile(file, opts, function(err, rendered) {
      if (err) return reject(err);

      var clone = file.clone();
      clone.path = path.resolve(clone.base, location);
      clone.contents = new Buffer(rendered);

      resolve(clone);
    });
  });
}

function prepareOptions(location, file) {
  var opts = {};
  var config = table.config.all();
  var collection = table.collection.all();

  opts.data = {};

  // @blogware, @site, @posts, @pages and @current
  _.merge(opts.data, config);
  _.merge(opts.data, collection);
  opts.data.current = file.meta('matter');

  // @tags
  opts.data.tags = table.tag.all();

  return opts;
}

module.exports = render;
