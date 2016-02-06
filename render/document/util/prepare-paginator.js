var _ = require('lodash');
var table = require('../../../table');
var l2p = require('./l2p');

function preparePaginator(location, file, opts) {
  var perpage = Math.floor(opts.data.current.perpage);
  var total = (opts.data.posts || []).length;

  if (!perpage) {
    return {
      perpage: perpage,
      total: total,
      begin: 0,
      end: total - 1,
      page: 1,
      pages: 1,
      prev: null,
      next: null
    };
  }

  var pages = Math.ceil(total / perpage) || 1;

  var page;
  var pattern = /\bpage\/(\d+)\b/;
  var matches = location.match(pattern);

  if (matches) {
    page = Number(matches[1]);
  }

  page = page || 1;

  var begin = perpage * (page - 1);
  var end = Math.min(perpage * page - 1, total - 1);

  var relative = file.relative;
  var locations = table.route.r2l(relative);
  var base = l2p(location).replace(pattern, '').replace(/\/+/g, '/');

  locations = _.filter(locations, function(entry) {
    return base === l2p(entry).replace(pattern, '').replace(/\/+/g, '/');
  });

  var index = locations.indexOf(location);
  var prev = l2p(locations[index - 1]);
  var next = l2p(locations[index + 1]);

  var paginator = {
    perpage: perpage,
    total: total,
    begin: begin,
    end: end,
    page: page,
    pages: pages,
    prev: prev,
    next: next
  }

  return paginator;
}

module.exports = preparePaginator;
