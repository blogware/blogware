var table = require('../table');
var record = table.record;
var route = table.route;

function render(location, cb) {
  var relative = route.l2r(location);
  var file = record.r2f(relative);

  if (!file) {
    return cb(new Error('File not found: ' + location));
  }

  if (file.meta('type') === 'asset') {
    renderAsset(file, function(err, rendered) {
      if (err) return cb(err);

      cb(null, rendered);
    });
  } else if (file.meta('type') === 'template') {
    renderTemplate(file, function(err, rendered) {
      if (err) return cb(err);

      cb(null, rendered);
    });
  } else {
    renderOther(file, function(err, rendered) {
      if (err) return cb(err);

      cb(null, rendered);
    });
  }
}

function renderAsset(file, cb) {
  var contents = file.contents.toString('utf8');

  cb(null, contents);
}

function renderTemplate(file, cb) {
  var engine = file.meta('engine');

  engine.render(file, {}, function(err, rendered) {
    if (err) return cb(err);

    cb(null, rendered);
  });
}

function renderOther(file, cb) {
  var engine = file.meta('engine');

  engine.render(file, {}, function(err, rendered) {
    if (err) return cb(err);

    cb(null, rendered);
  });
}

module.exports = render;
