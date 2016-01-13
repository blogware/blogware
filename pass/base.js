function pass(file) {

  file.base = file.cwd;

  return file;
}

module.exports = pass;
