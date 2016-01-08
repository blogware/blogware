var through = require('through2');
var pass = require('./pass');

function stream() {
  return through.obj(function(file, _, cb) {
    pass(file)
      .then(function() { cb() })
      .catch(cb);
  });
}

module.exports = stream;
