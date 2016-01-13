function pass(file) {
  if (!file) return null;

  if (file.meta('event') === 'unlink') {
    return file;
  }

  if (file.meta('type') !== 'document') {
    return file;
  }

  var engine = file.meta('engine');

  if (!engine.compile) {
    return file;
  }

  return new Promise(function(resolve, reject) {
    engine.compile(file, function(err, file) {
      if (err) return reject(err);

      resolve(file);
    });
  });
}

module.exports = pass;
