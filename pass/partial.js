function pass(file) {
  if (file.meta('type' !== 'template')) {
    return file;
  }

  if (file.relative.indexOf('_partials/') !== 0) {
    return file;
  }

  return new Promise(function(resolve, reject) {
    var engine = file.meta('engine');

    engine.registerPartial(file, function(err) {
      if (err) return reject(err);

      resolve(file);
    });
  });
}

module.exports = pass;
