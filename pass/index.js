var steps = [
  'patch',  // monkey patching to add the meta method
  'record', // caching the input files
  'route',  // updating the routing table
];

function pass(file) {
  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(file));
}

module.exports = pass;
