function pass(file) {
  if (!file) return null;

  file.base = file.cwd;

  return file;
}

module.exports = pass;
