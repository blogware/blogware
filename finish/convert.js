var _ = require('lodash');
var table = require('../table');

function finish(opts) {
  var files = opts.marked.convert || [];

  var promise = files.reduce(function(promise, file) {
    return promise.then(function() {
      return renderFile(file, opts)
        .then(function(rendered) {
          file.meta('matter').content = rendered;
        });
    });
  }, Promise.resolve());

  return promise.then(function() { return opts; });
}

function renderFile(file, opts) {
  return new Promise(function(resolve, reject) {
    var engine = file.meta('engine');

    if (!engine) {
      return reject(new Error('Plugin not found for rendering ' + file.relative));
    }

    engine.render(file, opts, function(err, rendered) {
      if (err) return reject(err);

      resolve(rendered);
    });
  });
}

module.exports = finish;
