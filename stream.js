var through = require('through2');
var pass = require('./pass');

function stream() {
  return through.obj(transform);

  function transform(file, _, cb) {
    var self = this;
    pass(file)
      .then(function(file) {
        if (!file) return cb();
        if (file.meta('type') === 'asset') {
          self.push(file);
        }
        cb();
      })
      .catch(cb);
  }
}

module.exports = stream;
