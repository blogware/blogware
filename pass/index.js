var steps = [
  'base',       // fixing base path of the input file
  'patch',      // monkey patching to add the meta method
  'filter',     // ignoring directories and unchanged files
  'engine',     // determing the file processor
  'type',       // asset, template or other
  'matter',     // parsing frontmatter
  'collection', // checking if it belongs to a collection
  'compile',    // precompiling templates
  'partial',    // registering a partial
  'record',     // caching the input file
  'date',       // setting the page date
  'route',      // updating the routing table
  'title',      // setting the page title
  'config',     // updating the config table
  'collect'     // updating the collection table (posts, pages, etc.)
];

function pass(file) {
  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(file));
}

module.exports = pass;
