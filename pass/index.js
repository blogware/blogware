var steps = [
  'patch',   // monkey patching to add the meta method
  'engine',  // determing the file processor
  'type',    // asset, template or other
  'matter',  // parsing frontmatter
  'compile', // precompiling templates
  'partial', // registering a partial
  'record',  // caching the input file
  'route',   // updating the routing table
];

function pass(file) {
  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(file));
}

module.exports = pass;
