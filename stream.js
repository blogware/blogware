var through = require('through2');
var route = require('./route');

function stream() {
  return through.obj(function(file, _, cb) {
    var relative = file.relative;
    var location = relative;

    route.add(relative, location);

    cb();
  });
}

module.exports = stream;
