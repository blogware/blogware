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
  if (err.status === 404) {
    res.send('404 ' + err.message);
  } else {
    next(err);
  }
});

module.exports = app;
