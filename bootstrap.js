var es6Promise = require('es6-promise');
var packageJson = require('./package.json');
var table = require('./table');
var plugin = require('./plugin');

function bootstrap() {
  setenv();
  promisePolyfill();
  updateConfigs();
  registerPlugins();
}

function setenv() {
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
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
