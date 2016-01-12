function pass(file) {
  var type = check(file);

  if (type === 'template' || type === 'markup') {
    type = 'document';
  }

  file.meta('type', type);

  return file;
}

function check(file) {
  var relative = file.relative;

  if (relative === '_config.yml') {
    return 'config';
  }

  var engine = file.meta('engine');

  if (!engine) {
    return 'asset';
  }

  if (engine.type === 'template engine') {
    return 'template';
  }

  if (engine.type === 'markup converter') {
    return 'markup';
  }

  return 'other';
}

module.exports = pass;
