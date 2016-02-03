var _ = require('lodash');
var table = require('../table');

function finalize(opts) {
  var posts = opts.marked.posts || [];
  var tags = table.tag.all();

  posts.forEach(function(post) {
    var _tags = post.meta('originalMatter').tags;

    if (_tags && !_.isArray(_tags)) {
      _tags = [_tags];
    }

    if (_tags) {
      post.meta('matter').tags = _tags.map(function(tag) {
        return tags[tag];
      });
    }
  });

  return opts;
}

module.exports = finalize;
