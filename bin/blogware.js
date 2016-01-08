#!/usr/bin/env node

var path = require('path');

require('blogware-cli')({
  cwd: process.cwd(),
  configPath: path.join(__dirname, '..', 'gulpfile.js')
});
