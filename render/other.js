function render(file, cb) {
  var engine = file.meta('engine');

  engine.render(file, {}, function(err, rendered) {
    if (err) return cb(err);

    cb(null, rendered);
  });
}

module.exports = render;
