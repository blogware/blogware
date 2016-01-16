var table = require('../table');
var render = require('../render');

function finish(stream, files) {
  var push = stream.push.bind(stream);

  return files.reduce(function(promise, file) {
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
}

module.exports = finish;
