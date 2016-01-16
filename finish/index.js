function finish(stream, files) {
  files.forEach(function(file) {
    stream.push(file);
  });

  return Promise.resolve();
}

module.exports = finish;
