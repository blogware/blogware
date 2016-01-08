var express = require('express');
var route = require('./table').route;
var render = require('./render');
var app = express();

app.get('*', function(req, res) {
  var location = req.url.slice(1);
  var relative = route.l2r(location);

  render(relative, function(err, rendered) {
    if (err) throw err;

    res.send(rendered);
  });
});

app.use(function(err, req, res, next) {
  res.status(404);
  res.send('404 Not found');
});

module.exports = app;
