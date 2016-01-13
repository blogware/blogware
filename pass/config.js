var frontmatter = require('frontmatter');
var table = require('../table');

function pass(file) {
  if (!file) return null;

  if (file.meta('type') !== 'config') {
    return file;
  }

  if (file.meta('event') !== 'unlink') {
    return add(file);
  } else {
    return del(file);
  }
}

function add(file) {
  return new Promise(function(resolve, reject) {
    var contents = file.contents.toString('utf8');
    contents = '---\n' + contents + '---\n';

    parse(contents, function(err, matter) {
      if (err) return reject(err);

      if (matter) {
        var data = matter.data;

        for (var name in data) {
          table.config.add('site', name, data[name]);
        }
      }

      resolve(file);
    });
  });
}

function del(file) {
  table.config.del('site');
  return file;
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
