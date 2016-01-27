var through = require('through2');
var pass = require('./pass');
var finish = require('./finish');

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
    finish(this, marked)
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
