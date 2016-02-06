var _ = require('lodash');
var table = require('../../../table');
var l2p = require('./l2p');

function prepareOptions(location, file) {
  var opts = {};
  var config = table.config.all();
  var collection = table.collection.all();

  opts.data = {};

  // @blogware, @site, @posts, @pages and @current
  _.merge(opts.data, config);
  _.merge(opts.data, collection);
  opts.data.current = file.meta('matter');

  // @authors
  var authors = table.author.all();
  opts.data.authors = Object.keys(authors);

  // @tags
  var tags = table.tag.all();
  opts.data.tags = Object.keys(tags);

  // @navigation
  var navigation = _.map(opts.data.site.navigation || [], function(value, key) {
    return {
      title: key,
      path: value
    };
  });

  navigation.forEach(function(entry) {
    var path1 = l2p(location).replace(/\/+$/, '');
    var path2 = entry.path.replace(/index.html$/, '').replace(/\/+$/, '');

    if (path1 === path2) {
      entry.current = true;
    }
  });

  opts.data.navigation = navigation.length ? navigation : null;

  return opts;
}

module.exports = prepareOptions;
