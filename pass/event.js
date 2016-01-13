function pass(file) {
  if (!file) return null;

  // possible: change, unlink
  // unused: add, addDir, unlinkDir
  file.meta('event', file.__event || 'change');

  delete file.__event;

  return file;
}

module.exports = pass;
