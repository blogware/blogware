var gutil = require('gulp-util');
var table = require('../table');
var render = require('../render');

function finish(opts) {
  var stream = opts.stream;
  var files = opts.marked.generate || [];

  var push = stream.push.bind(stream);

  var promises = files.map(function(file) {
    var relative = file.relative;
    var location = table.route.r2l(relative);

    if (process.env.NODE_ENV !== 'development') {
      gutil.log('Generating', '\'' + gutil.colors.green(location) + '\'');
    }

    if (!location) {
      return Promise.resolve(push(file));
    } else {
      return render(location).then(push);
    }
  });

  return Promise.all(promises).then(function() {
    return opts;
  });
}

module.exports = finish;
