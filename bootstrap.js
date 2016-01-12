var packageJson = require('./package.json');
var table = require('./table');
var plugin = require('./plugin');

function bootstrap() {
  updateConfigs();
  registerPlugins();
}

function updateConfigs() {
  var version = packageJson.version;
  table.config.add('blogware', 'version', version);
}

function registerPlugins() {
  plugin.register();
}

module.exports = bootstrap;
