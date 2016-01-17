var through = require('through2');
var pass = require('./pass');
var finish = require('./finish');

function stream() {
  var marked = {};

  return through.obj(transform, flush);

  function transform(file, _, cb) {
    var self = this;

    pass(file)
      .then(function(file) {
        if (!file) return cb();

        file.meta('mark').forEach(function(mark) {
          marked[mark] = marked[mark] || [];
          marked[mark].push(file);
        });

        cb();
      })
      .catch(cb);
  }

  function flush(cb) {
    finish(this, marked)
      .then(function() {
        cb();
      })
      .catch(cb);
  }
}

module.exports = stream;
