var _ = require('lodash');
var packageJson = require('./package.json');
var table = require('./table');

var requires = [];
var registry = {};

registry.type = {};
registry.extname = {};

function register() {
  var pattern = /^blogware-plugin-/;
  var packages = Object.keys(packageJson.dependencies);

  packages.forEach(function(package) {
    if (pattern.test(package)) {
      var opts = {
        config: table.config.all(),
        collection: table.collection.all()
      };
      registerPlugin(require(package).create(opts));
    }
  });
}

function registerPlugin(plugin) {
  var type = registry.type;
  var extname = registry.extname;

  requires.push(plugin);

  type[plugin.type] = type[plugin.type] || [];
  type[plugin.type].push(plugin);

  plugin.extnames.forEach(function(ext) {
    extname[ext] = extname[ext] || [];
    extname[ext].push(plugin);
  });
}

function lookup(name, group) {
  group = group || 'extname';

  if (registry[group][name]) {
    return registry[group][name][0];
  }

  return;
}

exports.register = register;
exports.lookup = lookup;
