function pass(file) {
  var type = check(file);

  if (type === 'template' || type === 'markup') {
    type = 'document';
  }

  file.meta('type', type);

  return file;
}

function check(file) {
  var type;

  var engine = file.meta('engine');

  if (!engine) {
    type = 'asset';
  } else if (engine.type === 'template engine') {
    type = 'template';
  } else if (engine.type === 'markup converter') {
    type = 'markup';
  } else {
    type = 'other';
  }

  return type;
}

module.exports = pass;
