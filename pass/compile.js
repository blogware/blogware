function pass(file) {
  if (file.meta('type') !== 'template') {
    return file;
  }

  return new Promise(function(resolve, reject) {
    var engine = file.meta('engine');

    engine.compile(file, function(err, file) {
      if (err) return reject(err);

      resolve(file);
    });
  });
}

module.exports = pass;
