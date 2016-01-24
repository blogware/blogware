var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (process.env.NODE_ENV === 'development') {
    if (file.meta('type') === 'asset') {
      mark(file);
    }
  } else {
    if (table.route.r2ls(file.relative)) {
      mark(file);
    }
  }

  return file;
}

function mark(file) {
  file.meta('mark').push('generate');
}

module.exports = pass;
