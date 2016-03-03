var gutil = require('gulp-util');
var table = require('../table');
var render = require('../render');

function finalize(opts) {
  var stream = opts.stream;
  var files = opts.marked.generate || [];

  if (process.env.NODE_ENV !== 'development') {
    var author = table.record.r2f('_layouts/author.hbs');
    if (author) files.push(author);

    var tag = table.record.r2f('_layouts/tag.hbs');
    if (tag) files.push(tag);
  }

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

module.exports = finalize;
