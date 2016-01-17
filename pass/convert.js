function pass(file) {
  if (!file) return null;

  if (file.meta('event') === 'unlink') {
    return file;
  }

  if (file.meta('type') !== 'document') {
    return file;
  }

  if (!file.meta('matter').path) {
    return file;
  }

  if (file.meta('engine').type === 'markup converter') {
    mark(file);
  }

  return file;
}

function mark(file) {
  file.meta('mark').push('convert');
}

module.exports = pass;
