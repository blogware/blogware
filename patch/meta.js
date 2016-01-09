function meta(key, value) {
  var meta = this.__meta || (this.__meta = {});

  if (value) {
    meta[key] = value;
  }

  return meta[key];
}

module.exports = meta;
