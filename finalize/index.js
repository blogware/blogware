var steps = [
  'convert',  // converting markup files
  'homepage', // paginating the homepage
  'tags',     // paginating the tag pages
  'posts',    // expanding post tags
  'generate'  // generating files
]

function finalize(stream, marked) {
  var opts = {
    stream: stream,
    marked: marked
  };

  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(opts));
}

module.exports = finalize;
