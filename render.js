var fs = require('fs');

function render(relative, cb) {
  fs.readFile(relative, 'utf8', function(err, contents) {
    if (err) return cb(err);

    cb(null, contents);
  });
}

module.exports = render;
