var express = require('express');
var route = require('./route');
var render = require('./render');
var app = express();

app.get('*', function(req, res) {
  var location = req.originalUrl.slice(1);
  var relative = route.l2r(location);

  render(relative, function(err, rendered) {
    if (err) throw err;

    res.send(rendered);
  });
});

module.exports = app;
