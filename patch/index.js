var meta = require('./meta');

function attach(obj) {
  if (!obj.meta) {
    obj.constructor.prototype.meta = meta;
  }
}

exports.attach = attach;
