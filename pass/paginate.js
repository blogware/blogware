var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('event') === 'unlink') {
    return file;
  }

  if (file.meta('type') !== 'document') {
    return file;
  }

  if (!table.route.r2l(file.relative)) {
    return file;
  }

  if (file.meta('matter').perpage) {
    mark(file);
  }

  return file;
}

function mark(file) {
  file.meta('mark').push('paginate');
}

module.exports = pass;
