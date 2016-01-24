var gutil = require('gulp-util');
var table = require('../table');
var render = require('../render');

function finish(opts) {
  var stream = opts.stream;
  var files = opts.marked.generate || [];

  var push = stream.push.bind(stream);

  var promises = files.map(function(file) {
    var relative = file.relative;
    var locations = table.route.r2l(relative);

    if (!locations) {  // deleted files
      return Promise.resolve(push(file));
    } else {
      return locations.reduce(function(promise, location) {
        return promise
          .then(function() {
            if (process.env.NODE_ENV !== 'development') {
              gutil.log('Generating', '\'' + gutil.colors.green(location) + '\'');
            }

            return render(location);
          })
          .then(push);
      }, Promise.resolve());
    }
  });

  return Promise.all(promises).then(function() {
    return opts;
  });
}

module.exports = finish;
