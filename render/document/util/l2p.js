function l2p(location) {
  if (!location) return null;

  var path = location;

  path = '/' + path;
  path = path.replace(/index.html$/, '');

  return path;
}

module.exports = l2p;
