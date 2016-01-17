function pass(file) {
  if (!file) return null;

  mark(file);

  return file;
}

function mark(file) {
  if (file.meta('type') === 'asset') {
    file.meta('mark').push('generate');
  }
}

module.exports = pass;
