var es6Promise = require('es6-promise');
var packageJson = require('./package.json');
var table = require('./table');
var plugin = require('./plugin');

function bootstrap() {
  promisePolyfill();
  updateConfigs();
  registerPlugins();
}

function promisePolyfill() {
  es6Promise.polyfill();
}

function updateConfigs() {
  var version = packageJson.version;
  table.config.add('blogware', 'version', version);
}

function registerPlugins() {
  plugin.register();
}

module.exports = bootstrap;
