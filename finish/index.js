var steps = [
  'convert', // converting markup files
  'generate' // generating files
]

function finish(stream, marked) {
  var opts = {
    stream: stream,
    marked: marked
  };

  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(opts));
}

module.exports = finish;
