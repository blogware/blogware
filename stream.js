var through = require('through2');
var pass = require('./pass');
var finalize = require('./finalize');

function stream() {
  var marked = {};

  var _stream = through.obj(transform, flush);

  _stream.on('error', function(err) {
    console.log(err.stack);
    _stream.end();
  });

  return _stream;

  function transform(file, _, cb) {
    var self = this;

    pass(file)
      .then(function(file) {
        if (!file) return cb();

        marked.modified = marked.modified || [];
        marked.modified.push(file);

        file.meta('mark').forEach(function(mark) {
          marked[mark] = marked[mark] || [];
          marked[mark].push(file);
        });

        cb();
      })
      .catch(function(err) {
        console.log(err.stack);
        cb();
      });
  }

  function flush(cb) {
    finalize(this, marked)
      .then(function() {
        cb();
      })
      .catch(function(err) {
        console.log(err.stack);
        cb();
      });
  }
}

module.exports = stream;
