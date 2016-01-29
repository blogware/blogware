var steps = [
  'base',     // fixing base path of the input file
  'patch',    // monkey patching to add the meta method
  'event',    // setting the event type
  'filter',   // ignoring directories and unchanged files
  'engine',   // determing the file processor
  'type',     // asset, template or other
  'matter',   // parsing frontmatter
  'group',    // checking if it belongs to a collection
  'compile',  // precompiling templates
  'partial',  // registering a partial
  'record',   // caching the input file
  'date',     // setting the page date
  'route',    // updating the routing table
  'tag',      // updating the tag table
  'title',    // setting the page title
  'path',     // setting the page path
  'config',   // updating the config table
  'collect',  // updating the collection table (posts, pages, etc.)
  'sitetime', // setting last update time of the site
  'mark',     // reseting file marks
  'convert',  // marking files to convert (e.g. markup files)
  'post',     // marking modified posts for paginating
  'generate'  // marking files to generate
];

function pass(file) {
  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(file));
}

module.exports = pass;
