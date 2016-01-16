var through = require('through2');
var pass = require('./pass');

function stream() {
  var marked = [];

  return through.obj(transform, flush);

  function transform(file, _, cb) {
    var self = this;
    pass(file)
      .then(function(file) {
        if (!file) return cb();
        if (file.meta('type') === 'asset') {
          marked.push(file);
        }
        cb();
      })
      .catch(cb);
  }

  function flush(cb) {
    var self = this;
    marked.forEach(function(file) {
      self.push(file);
    });
    cb();
  }
}

module.exports = stream;
