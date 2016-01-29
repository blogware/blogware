var _ = require('lodash');
var path = require('path');
var table = require('../../table');
var plugin = require('../../plugin');

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
  _.merge(opts.data, config);
  _.merge(opts.data, collection);
  opts.data.current = file.meta('matter');
  opts.__layout = {};

  opts.data.paginator = preparePaginator(opts, location, file);

  if (location === 'index.html') {
    opts.data.home = true;
  }

  if (opts.data.paginator.page > 1) {
    opts.data.paged = true;
  }

  return opts;
}

function preparePaginator(opts, location, file) {
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

  // var prevNumber = page > 1 ? page - 1 : null;
  // var nextNumber = perpage * page < total ? page + 1 : null;

  var relative = file.relative;
  var locations = table.route.r2l(relative);
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

function l2p(location) {
  if (!location) return null;

  var path2 = location;

  path2 = '/' + path2;
  path2 = path2.replace(/index.html$/, '');

  return path2;
}

function renderFile(file, opts, cb) {
  var engine = file.meta('engine');

  if (!engine) {
    return cb(new Error('Plugin not found for rendering ' + file.relative));
  }

  engine.render(file, opts, function(err, rendered) {
    if (err) return cb(err);

    var layout = file.meta('matter').layout;

    if (layout) {
      layout = '_layouts/' + layout;

      if (!path.extname(layout)) {
        var _engine = engine;

        if (_engine.type !== 'template engine') {
          _engine = plugin.lookup('template engine', 'type');
        }

        layout = layout + _engine.extnames[0];
      }

      var layoutFile = table.record.r2f(layout);

      if (!layoutFile) {
        return cb(new Error('Layout not found: ' + layout));
      }

      if (opts.__layout[layout]) {
        return cb(new Error('Layout are circular referenced: ' + layout));
      }

      opts.__layout[layout] = true;
      opts.body = rendered;

      return renderFile(layoutFile, opts, cb);
    }

    return cb(null, rendered);
  });
}

module.exports = render;
