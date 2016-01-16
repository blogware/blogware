var steps = [
  'generate' // generating files
]

function finish(stream, files) {
  var opts = {
    stream: stream,
    files: files
  }

  return steps.reduce(function(promise, step) {
    return promise.then(require('./' + step));
  }, Promise.resolve(opts));
}

module.exports = finish;
