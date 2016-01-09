var path = require('path');

function render(location, file) {
  return new Promise(function(resolve, reject) {
    var engine = file.meta('engine');

    engine.render(file, {}, function(err, rendered) {
      if (err) return reject(err);

      var clone = file.clone();
      clone.path = path.resolve(clone.base, location);
      clone.contents = new Buffer(rendered);

      resolve(clone);
    });
  });
}

module.exports = render;
