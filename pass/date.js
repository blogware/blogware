function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  var date = file.meta('matter').date;

  if (date) {
    return file;
  }

  var relative = file.relative;
  var collection = file.meta('collection');

  if (collection) {
    relative = relative.replace('_' + collection + '/', '');
  }

  var pattern = /^(\d{4}-\d{2}-\d{2})-/;
  var matches = relative.match(pattern);

  if (matches) {
    file.meta('matter').date = matches[1];
  }

  return file;
}

module.exports = pass;
