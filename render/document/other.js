var path = require('path');
var renderFile = require('./util').renderFile;

function render(location, file, opts) {
  updateOptions(location, file, opts);

  return new Promise(function(resolve, reject) {
    renderFile(file, opts, function(err, rendered) {
      if (err) return reject(err);

      var clone = file.clone();
      clone.path = path.resolve(clone.base, location);
      clone.contents = new Buffer(rendered);

      resolve(clone);
    });
  });
}

function updateOptions(location, file, opts) {
  return opts;
}

module.exports = render;
