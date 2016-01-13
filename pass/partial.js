function pass(file) {
  if (!file) return null;

  if (file.meta('type' !== 'document')) {
    return file;
  }

  if (file.relative.indexOf('_partials/') !== 0) {
    return file;
  }

  if (file.meta('event') !== 'unlink') {
    return add(file);
  } else {
    return del(file);
  }
}

function add(file) {
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

function del(file) {
  var engine = file.meta('engine');

  if (!engine.unregisterPartial) {
    return file;
  }

  return new Promise(function(resolve, reject) {
    engine.unregisterPartial(file, function(err) {
      if (err) return reject(err);

      resolve(file);
    });
  });
}

module.exports = pass;
