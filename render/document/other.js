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
  var tags = table.tag.all();
  opts.data.tags = Object.keys(tags);

  // @navigation
  var navigation = _.cloneDeep(opts.data.site.navigation);

  navigation.forEach(function(item) {
    var path1 = l2p(location).replace(/\/+$/, '');
    var path2 = item.path.replace(/index.html$/, '').replace(/\/+$/, '');

    if (path1 === path2) {
      item.current = true;
    }
  });

  opts.data.navigation = navigation;

  return opts;
}

function l2p(location) {
  if (!location) return null;

  var path2 = location;

  path2 = '/' + path2;
  path2 = path2.replace(/index.html$/, '');

  return path2;
}

module.exports = render;
