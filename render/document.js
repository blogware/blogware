var _ = require('lodash');
var path = require('path');
var table = require('../table');
var plugin = require('../plugin');

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

  opts.data.paginator = preparePaginator(opts, location);

  return opts;
}

function preparePaginator(opts, location) {
  var perpage = Math.floor(opts.data.current.perpage);
  var length = (opts.data.posts || []).length;

  if (!perpage) {
    return {
      perpage: perpage,
      length: length,
      start: 0,
      end: length - 1,
      current: 1,
      total: 1,
      previous: null,
      next: null
    };
  }

  var total = Math.ceil(length / perpage);

  var current;
  var pattern = /\/page\/(\d+)\//;
  var matches = location.match(pattern);

  if (matches) {
    current = Number(matches[1]);
  }

  current = current || 1;

  var previous = current > 1 ? current - 1 : null;
  var next = perpage * current < length ? current + 1 : null;
  var start = perpage * (current - 1);
  var end = Math.min(perpage * current - 1, length - 1);

  var paginator = {
    perpage: perpage,
    length: length,
    start: start,
    end: end,
    current: current,
    total: total,
    previous: previous,
    next: next
  }

  return paginator;
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
