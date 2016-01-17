var _ = require('lodash');
var table = require('../table');

function finish(opts) {
  var files = opts.marked.convert || [];

  var promises = files.map(function(file) {
    return renderFile(file).then(function(rendered) {
      file.meta('matter').content = rendered;
    });
  });

  return Promise.all(promises).then(function() {
    return opts;
  });
}

function renderFile(file) {
  return new Promise(function(resolve, reject) {
    var engine = file.meta('engine');

    if (!engine) {
      return reject(new Error(
        'Plugin not found for rendering ' + file.relative
      ));
    }

    engine.render(file, {}, function(err, rendered) {
      if (err) return reject(err);
      resolve(rendered);
    });
  });
}

module.exports = finish;
