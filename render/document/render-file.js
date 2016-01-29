var path = require('path');
var table = require('../../table');
var plugin = require('../../plugin');

function renderFile(file, opts, cb) {
  opts.__layout = opts.__layout || {};

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

module.exports = renderFile;
