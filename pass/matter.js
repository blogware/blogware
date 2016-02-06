var _ = require('lodash');
var frontmatter = require('frontmatter');

function pass(file) {
  if (!file) return null;

  if (file.meta('event') === 'unlink') {
    file.meta('matter', {});
    return file;
  }

  if (file.meta('type') !== 'document') {
    return file;
  }

  return new Promise(function(resolve, reject) {
    var contents = file.contents.toString('utf8');

    parse(contents, function(err, parsed) {
      if (err) return reject(err);

      file.meta('originalContents', contents);
      file.meta('matter', parsed.data || {});
      file.meta('matter').relative = file.relative;
      file.contents = new Buffer(parsed.content);

      resolve(file);
    });
  });
}

function parse(contents, cb) {
  var parsed;

  try {
    parsed = frontmatter(contents);
  } catch(err) {
    return cb(err);
  }

  cb(null, parsed);
}

module.exports = pass;
