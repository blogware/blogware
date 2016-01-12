var frontmatter = require('frontmatter');

function pass(file) {
  if (file.meta('type') !== 'document') {
    return file;
  }

  return new Promise(function(resolve, reject) {
    var contents = file.contents.toString('utf8');

    parse(contents, function(err, matter) {
      if (err) return reject(err);

      if (matter) {
        file.meta('matter', matter.data);
        file.contents = new Buffer(matter.content);
      } else {
        file.meta('matter', {});
      }

      resolve(file);
    });
  });
}

function parse(contents, cb) {
  var matter;

  try {
    matter = frontmatter(contents);
  } catch(err) {
    return cb(err);
  }

  cb(null, matter);
}

module.exports = pass;
