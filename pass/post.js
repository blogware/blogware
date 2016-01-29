function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  if (file.meta('collection') === 'posts') {
    mark(file);
  }

  return file;
}

function mark(file) {
  file.meta('mark').push('posts');
}

module.exports = pass;
