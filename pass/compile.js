function pass(file) {
  if (file.meta('type') !== 'template') {
    return file;
  }

  return new Promise(function(resolve, reject) {
    var engine = file.meta('engine');
    var contents = file.contents.toString('utf8');

    engine.compile(contents, function(err, template) {
      if (err) return reject(err);

      file.meta('template', template);

      resolve(file);
    });
  });
}

module.exports = pass;
