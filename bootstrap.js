var plugin = require('./plugin');

function bootstrap() {
  registerPlugins();
}

function registerPlugins() {
  plugin.register();
}

module.exports = bootstrap;
