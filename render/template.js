var path = require('path');
var table = require('../table');

function render(location) {
  return new Promise(function(resolve, reject) {
    var file = table.l2f(location);

    var opts = {};
    opts.__layout = {};

    renderFile(file, opts, function(err, rendered) {
      if (err) return reject(err);

      var clone = file.clone();
      clone.path = path.resolve(clone.base, location);
      clone.contents = new Buffer(rendered);

      resolve(clone);
    });
  });
}

function renderFile(file, opts, cb) {
  var engine = file.meta('engine');

  if (!engine) {
    return cb(new Error('Plugin not found for rendering ' + file.relative));
  }

  engine.render(file, opts, function(err, rendered) {
    if (err) return cb(err);

    var layout = file.meta('frontmatter').layout;

    if (layout) {
      layout = '_layouts/' + layout;

      if (!path.extname(layout)) {
        layout = layout + engine.extnames[0];
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
