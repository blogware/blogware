var express = require('express');
var render = require('./render');
var app = express();

app.get('*', function(req, res) {
  var location = req.url.slice(1);

  render(location, function(err, rendered) {
    if (err) throw err;

    res.send(rendered);
  });
});

app.use(function(err, req, res, next) {
  res.status(404);
  res.send('404 Not found');
});

module.exports = app;
