function getSlug(type, location) {
  var slug;
  var pattern = new RegExp(type + '/([^/]+)/?');
  var matches = location.match(pattern);

  if (matches) {
    slug = matches[1];
  }

  return slug;
}

module.exports = getSlug;
