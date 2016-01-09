function render(file, cb) {
  var contents = file.contents.toString('utf8');

  cb(null, contents);
}

module.exports = render;
