var _ = require('lodash');
var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'document') {
    return file;
  }

  if (file.meta('collection') !== 'posts') {
    return file;
  }

  if (file.meta('event') !== 'unlink') {
    add(file);
  } else {
    del(file);
  }

  return file;
}

function add(file) {
  var tags = file.meta('matter').tags;

  if (!_.isArray(tags)) {
    tags = [tags];
  }

  tags = _.uniq(_.compact(tags));

  var relative = file.relative;

  table.tag.add(relative, tags);
}

function del(file) {
  var relative = file.relative;

  table.tag.del(relative);
}

module.exports = pass;
