var table = require('./table');
var record = table.record;

function render(relative, cb) {
  var file = record.r2f(relative);

  if (!file) {
    return cb(new Error('File not found'));
  }

  var contents = file.contents.toString('utf8');

  cb(null, contents);
}

module.exports = render;
