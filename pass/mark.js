function pass(file) {
  if (!file) return null;

  file.meta('mark', []);

  return file;
}

module.exports = pass;
