function pass(file) {
  if (!file) return null;

  if (file.meta('type') === 'asset') {
    mark(file);
  }

  return file;
}

function mark(file) {
  file.meta('mark').push('generate');
}

module.exports = pass;
