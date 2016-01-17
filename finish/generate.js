var table = require('../table');
var render = require('../render');

function finish(opts) {
  var stream = opts.stream;
  var files = opts.marked.generate || [];

  var push = stream.push.bind(stream);

  var p =  files.reduce(function(promise, file) {
    return promise.then(function() {
      var relative = file.relative;
      var location = table.route.r2l(relative);

      if (!location) {
        return Promise.resolve(push(file));
      } else {
        return render(location).then(push);
      }
    });
  }, Promise.resolve());

  return p.then(function() { return opts; });
}

module.exports = finish;
