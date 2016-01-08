var through = require('through2');

function stream() {
  return through.obj(function(file, _, cb) {
    cb();
  });
}

module.exports = stream;
