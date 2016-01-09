function pass(file) {
  var type = check(file);

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
  } else {
    type = 'other';
  }

  return type;
}

module.exports = pass;
