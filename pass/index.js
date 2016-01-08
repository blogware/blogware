var route = require('./route');

function pass(file) {
  return Promise.resolve(file)
    .then(route);
}

module.exports = pass;
