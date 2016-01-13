function pass(file) {
  if (!file) return null;

  if (file.meta('type' !== 'document')) {
    return file;
  }

  if (file.relative.indexOf('_partials/') !== 0) {
    return file;
  }

  var engine = file.meta('engine');

  if (!engine.registerPartial) {
    return file;
  }

  return new Promise(function(resolve, reject) {
    engine.registerPartial(file, function(err) {
      if (err) return reject(err);

      resolve(file);
    });
  });
}

module.exports = pass;
