var packageJson = require('./package.json');

var store = {};

function register() {
  var pattern = /^blogware-plugin-/;
  var packages = Object.keys(packageJson.dependencies);

  packages.forEach(function(package) {
    if (pattern.test(package)) {
      registerPlugin(require(package));
    }
  });
}

function registerPlugin(plugin) {
  plugin.extnames.forEach(function(extname) {
    store[extname] = plugin;
  });
}

function lookup(extname) {
  return store[extname];
}

exports.register = register;
exports.lookup = lookup;
